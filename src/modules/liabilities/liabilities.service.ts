import { Inject, Injectable, Res } from '@nestjs/common';
import { CreateLiabilityDto } from './dto/create-liability.dto';
import { UpdateLiabilityInfoDto } from './dto/update-liability.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LoggingService } from '@/global/logger/logging.service';
import { Liabilities, LiabilitiesDocument } from '@/model/Liabilities.entities';
import { Model } from 'mongoose';
import { ResponseDto } from '@/utils/response';
import dayjs from 'dayjs';

@Injectable()
export class LiabilitiesService {
  constructor(
    @InjectModel('Liabilities')
    private liabilitiesModel: Model<Liabilities>,

    @Inject()
    private readonly logger: LoggingService // 注入 LoggingService
  ) { }
  async create(createLiabilityDto: CreateLiabilityDto) {
    let result = await this.liabilitiesModel.create(createLiabilityDto)
    if (result) {
      return ResponseDto.successWithAutoTip({}, '新建成功')
    }
    return 'This action adds a new liability';
  }

  async getLoanList() {
    let result = await this.liabilitiesModel.find().lean()
    if (result.length != 0) {
      return ResponseDto.success(result)
    }
    return ResponseDto.success([])
  }

  async deleteLoan(_id: string) {
    let result = await this.liabilitiesModel.deleteOne({
      _id: _id
    })
    if (result.deletedCount == 1) {
      return ResponseDto.successWithAutoTip({}, '删除成功')
    }
    return ResponseDto.failureWithAutoTip('删除失败')
  }

  async editloaninfo(updateLiabilityDto: UpdateLiabilityInfoDto) {
    //根据更新信息的总期数，生成对应长度的还款计划
    let loanRepaymentSchedule = []

    for (let i = 0; i < updateLiabilityDto.totalPeriod; i++) {
      loanRepaymentSchedule.push(
        {
          numberPeriods:(i+1),
          repaymentDate: new Date(updateLiabilityDto.loanInitiationTime),
          initialBalance: 0,
          repaymentScheduleAmt: 0,
          additionalRepayment: 0,
          accumulatedInterest: 0,
          principal: 0,
          closingBalance: 0,
          repaymentStatus: '',
        }
      )
    }

    let result = await this.liabilitiesModel.updateOne({
      _id: updateLiabilityDto._id,
    }, {
      ...updateLiabilityDto, loanInitiationTime: new Date(updateLiabilityDto.loanInitiationTime),
      loanRepaymentSchedule: loanRepaymentSchedule
    }).lean()
    // return 
    if (result.matchedCount == 1 && result.modifiedCount == 1) {
      return ResponseDto.successWithAutoTip({}, '修改成功')
    }
    return ResponseDto.failureWithAutoTip('修改失败，请重试')
  }

  async getLoanInfo(id: string) {
    let result = await this.liabilitiesModel.findOne({
      _id: id
    }, {
      loanRepaymentSchedule: 0
    }).lean()
    if (result) {

      return ResponseDto.success({
        ...result,
        loanInitiationTime: dayjs(result.loanInitiationTime).format('YYYY-MM-DD')
      })
    }
    return ResponseDto.success({})
  }


  async getLoanInfoList(id: string) {
    let result = await this.liabilitiesModel.findOne({
      _id: id
    }).lean()
    if (result) {
      return ResponseDto.success(result.loanRepaymentSchedule)
    }
    return ResponseDto.success([])
  }

  async updateLoanInfolist(createRepaymentScheduleDto) {
    let updateInfo = {
      ...createRepaymentScheduleDto
    }
    delete updateInfo._id
    //先查找存在的计划表
    let updataInfo=await this.liabilitiesModel.findOne({
      _id:createRepaymentScheduleDto._id
    }).lean()
    //修改对应的计划表
    updateInfo= updataInfo.loanRepaymentSchedule.map((element=>{
        if(element.numberPeriods==updateInfo.numberPeriods){
          return {
            ...updateInfo
          }
        }
        return element
    }))
    //更新数据库
    let result = await this.liabilitiesModel.updateOne({
      _id: createRepaymentScheduleDto._id
    }, {
      loanRepaymentSchedule: updateInfo
    })

    if (result.matchedCount == 1 && result.modifiedCount == 1) {
      return ResponseDto.successWithAutoTip({}, '更新成功')
    }

    return ResponseDto.failureWithAutoTip('更新失败')

  }
}
