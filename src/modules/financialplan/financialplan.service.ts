import { Inject, Injectable } from '@nestjs/common';
import { CreateFinancialplanDto } from './dto/create-financialplan.dto';
import { UpdateFinancialplanDto } from './dto/update-financialplan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LoggingService } from '@/global/logger/logging.service';
import { FinancialPlanDocument } from '@/model/FinancialPlan.entities';
import { Model } from 'mongoose';
import { ResponseDto } from '@/utils/response';
import dayjs from 'dayjs';

@Injectable()
export class FinancialplanService {
  constructor(
    @InjectModel('FinancialPlan')
    private financialPlanModel: Model<FinancialPlanDocument>,
    @Inject()
    private readonly logger: LoggingService // 注入 LoggingService
  ) { }

  create(createFinancialplanDto: CreateFinancialplanDto) {
    let result = this.financialPlanModel.create(createFinancialplanDto)
    if (result) {
      return ResponseDto.successWithAutoTip({}, '新增成功')
    }
    return ResponseDto.failureWithAutoTip('新增失败')
  }

  async getPlan(queryFinancialplanDto) {
    let queryData = {
      ...queryFinancialplanDto
    }
    if (queryData.period === '-1') {
      delete queryData.period
    }
    queryData.planDate = {
      $gte: dayjs(queryData.planDate).startOf('month'),
      $lt: dayjs(queryData.planDate).endOf('month'),
    }

    let result = await this.financialPlanModel.find(queryData).lean()
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


  // findOne(id: number) {
  //   return `This action returns a #${id} financialplan`;
  // }

  // update(id: number, updateFinancialplanDto: UpdateFinancialplanDto) {
  //   return `This action updates a #${id} financialplan`;
  // }


}
