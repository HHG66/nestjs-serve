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
    let result =await this.financialPlanModel.find(queryFinancialplanDto).lean()
    let formatDataList=result.map(res=>{
      return {
        ...res,
        planDate:dayjs(res.planDate).format('YYYY-MM-DD')
      }
    })
    return ResponseDto.success(formatDataList)
  }

  findOne(id: number) {
    return `This action returns a #${id} financialplan`;
  }

  update(id: number, updateFinancialplanDto: UpdateFinancialplanDto) {
    return `This action updates a #${id} financialplan`;
  }

  remove(id: number) {
    return `This action removes a #${id} financialplan`;
  }
}
