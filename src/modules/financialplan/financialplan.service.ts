import { Inject, Injectable } from '@nestjs/common';
import { CreateFinancialplanDto } from './dto/create-financialplan.dto';
import { UpdateFinancialplanDto } from './dto/update-financialplan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LoggingService } from '@/global/logger/logging.service';
import { FinancialPlanDocument } from '@/model/FinancialPlan.entities';
import { Model } from 'mongoose';
import { ResponseDto } from '@/utils/response';
import dayjs, { Dayjs } from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear' // ES 2015
import { QueryFinancialplanDto } from './dto/query-financialplan.dto';
dayjs.extend(quarterOfYear)


@Injectable()
export class FinancialplanService {
  constructor(
    @InjectModel('FinancialPlan')
    private financialPlanModel: Model<FinancialPlanDocument>,
    @Inject()
    private readonly logger: LoggingService // 注入 LoggingService
  ) {
  }

  create(createFinancialplanDto: CreateFinancialplanDto) {
    //根据生效时间planDate生成对应周期范围
    let periodCorrespondingField = {
      einmal: "day",
      month: 'month',
      quarter: "quarter",
      year: "year"
    }
    //预算周期开始时间
    let periodStartDate = dayjs(createFinancialplanDto.planDate).startOf(periodCorrespondingField[createFinancialplanDto.period])
    //预算周期截至时间
    let periodEndDate = dayjs(createFinancialplanDto.planDate).endOf(periodCorrespondingField[createFinancialplanDto.period])
    let result = this.financialPlanModel.create({ ...createFinancialplanDto, periodStartDate, periodEndDate })
    if (result) {
      return ResponseDto.successWithAutoTip({}, '新增成功')
    }
    return ResponseDto.failureWithAutoTip('新增失败')
  }

  async getPlan(queryFinancialplanDto: QueryFinancialplanDto) {
    let queryData: any = {
      ...queryFinancialplanDto
    }
    if (queryData.period === '-1') {
      delete queryData.period
    }
    queryData.planDate = {
      $gte: dayjs(queryData.planDate).startOf('year'),
      $lt: dayjs(queryData.planDate).endOf('year'),
    }

    // let result = await this.financialPlanModel.find(queryData).lean()
    let result = await this.financialPlanModel.aggregate([
      { $sort: { planDate: -1 } },
       {
        $group: {
          _id: "$planName",
          doc: { $first: "$$ROOT" }// $first 运算符，从每组文档中获取排序后（$sort 阶段）的第一个文档
        }
      },
      { $replaceRoot: { newRoot: "$doc" } },//替换根文档
    ]).exec()
    
    let formatDataList = result.map(res => {
      return {
        ...res,
        planDate: dayjs(res.planDate).format('YYYY-MM-DD')
      }
    })
    return ResponseDto.success(formatDataList)
  }


  async updataPlan(updateFinancialplanDto: UpdateFinancialplanDto) {
    let result = await this.financialPlanModel.updateOne({
      _id: updateFinancialplanDto._id
    }, updateFinancialplanDto)
    if (result.matchedCount == 1 && result.modifiedCount == 1) {
      return ResponseDto.successWithAutoTip({}, '更新成功')
    }
    return ResponseDto.failureWithAutoTip('更新失败')
  }

  async remove(_id: string) {
    let result = await this.financialPlanModel.deleteOne({
      _id
    })
    if (result.deletedCount == 1) {
      return ResponseDto.successWithAutoTip(undefined, '删除成功');
    } return ResponseDto.failureWithAutoTip('删除失败');
  }


  async getDepositPlan() {

  }

  // findOne(id: number) {
  //   return `This action returns a #${id} financialplan`;
  // }

  // update(id: number, updateFinancialplanDto: UpdateFinancialplanDto) {
  //   return `This action updates a #${id} financialplan`;
  // }


}
