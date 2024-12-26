/*
 * @Author: HHG
 * @Date: 2024-12-25 16:19:29
 * @LastEditTime: 2024-12-26 22:40:16
 * @LastEditors: 韩宏广
 * @FilePath: /financial-serve/src/modules/liabilities/liabilities.service.ts
 * @文件说明: 
 */

import { Inject, Injectable, Res } from '@nestjs/common';
import { CreateLiabilityDto } from './dto/create-liability.dto';
import { UpdateLiabilityInfoDto } from './dto/update-liability.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LoggingService } from '@/global/logger/logging.service';
import { Liabilities, LiabilitiesDocument } from '@/model/Liabilities.entities';
import { Model } from 'mongoose';
import { ResponseDto } from '@/utils/response';
import dayjs from 'dayjs';
import BigNumber from 'bignumber.js';
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
    //查找库中计划表
    let { loanRepaymentSchedule: existLoanRepaymentScheduleList, ...loanInfo } = await this.liabilitiesModel.findOne({
      _id: updateLiabilityDto._id
    }).lean()
    //  根据是否更新标志来确定是否更新贷款计划单
    if (updateLiabilityDto.isPlanSheetUpdated) {
      for (let i = 0; i < updateLiabilityDto.totalPeriod; i++) {
        //存在对应的还款期数信息
        if (existLoanRepaymentScheduleList[i]) {
          // console.log("existLoanRepaymentScheduleList[i]", existLoanRepaymentScheduleList[i]);
          loanRepaymentSchedule.push(
            existLoanRepaymentScheduleList[i]
          )
        } else {
          loanRepaymentSchedule.push(
            {
              numberPeriods: (i + 1),
              repaymentDate: new Date(updateLiabilityDto.loanInitiationTime),
              initialBalance: 0,
              repaymentScheduleAmt: RepaymentMethodCalculation.averageCapitalPlusInterest(loanInfo.amount, updateLiabilityDto.loanPeriod, loanInfo.interestRate, 'month'),
              additionalRepayment: 0,
              accumulatedInterest: 0,
              principal: 0,
              closingBalance: 0,
              repaymentStatus: '',
            }
          )
        }
      }
    }
    let uptaInfo = {
      ...updateLiabilityDto, loanInitiationTime: new Date(updateLiabilityDto.loanInitiationTime),
      loanRepaymentSchedule: loanRepaymentSchedule
    }
    updateLiabilityDto.isPlanSheetUpdated == false ? delete uptaInfo.loanRepaymentSchedule : ''
    let result = await this.liabilitiesModel.updateOne({
      _id: updateLiabilityDto._id,
    }, uptaInfo).lean()
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
      let loanRepaymentScheduleList = result.loanRepaymentSchedule.map((element) => {
        return {
          ...element,
          repaymentDate: element.repaymentDate ? dayjs(element.repaymentDate).format('YYYY-MM-DD') : ''
        }
      })
      return ResponseDto.success(loanRepaymentScheduleList)
    }
    return ResponseDto.success([])
  }

  async updateLoanInfolist(createRepaymentScheduleDto) {
    let updateInfo = {
      ...createRepaymentScheduleDto
    }
    delete updateInfo._id
    //先查找存在的计划表
    let updataInfo = await this.liabilitiesModel.findOne({
      _id: createRepaymentScheduleDto._id
    }).lean()
    //修改对应的计划表
    updateInfo = updataInfo.loanRepaymentSchedule.map((element => {
      if (element.numberPeriods == updateInfo.numberPeriods) {
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

function test() {

}

class RepaymentMethodCalculation {
  /**
   * @description: 等额本息还款法,每月还款金额
   * @param {number}  principal 本金
   * @param {number} loanPeriod  贷款期限
   * @param {number} interestRate 利率(%)
   * @param {string} machineCycle 计算周期，day year month
   * @return {number}  周期还款金额
   * @author: 韩宏广
   */

  static averageCapitalPlusInterest(principal, loanPeriod, interestRate, machineCycle) {
    // 转换所有输入为 BigNumber
    const principalBn = new BigNumber(principal);
    const loanPeriodBn = new BigNumber(loanPeriod);
    const interestRateBn = new BigNumber(interestRate);

    // 贷款期限（月）
    let repaymentMonths = loanPeriodBn.times(12);
    console.log(repaymentMonths.toString());

    // 贷款本金（月）
    let loanAmount = principalBn.dividedBy(repaymentMonths);

    // 月利率
    let monthlyInterestRate = interestRateBn.dividedBy(100).dividedBy(12);

    // 每月还款金额公式计算
    // 每月还款金额 = 贷款本金 *  (月利率 × (1+月利率) **还款月数/(1+月利率)**还款月数 -1) 。其中，月利率 = 年利率 ÷ 12，还款月数 = 贷款期限的月数（贷款年限 × 12）。
    let addOne = new BigNumber(1).plus(monthlyInterestRate);
    let powResult = addOne.pow(repaymentMonths);
    let molecule = monthlyInterestRate.times(powResult);
    let denominator = powResult.minus(1);
    let machineCycleAmt = principalBn.times(molecule).dividedBy(denominator);

    return machineCycleAmt.toString(); // 返回字符串表示，或者根据需求选择返回 BigNumber 对象
  }
}
