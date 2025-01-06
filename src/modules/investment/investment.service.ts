import { Inject, Injectable, Res } from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { DepositDocument } from '@/model/Deposit.entities';
import { InjectModel } from '@nestjs/mongoose';
import { LoggingService } from '@/global/logger/logging.service';
import { Model } from 'mongoose';
import { ResponseDto } from '@/utils/response';
import dayjs from 'dayjs';
import BigNumber from 'bignumber.js';

@Injectable()
export class InvestmentService {
  constructor(
    // private readonly logger: CustomWinstonLogger,
    @InjectModel('Deposit')
    private depositModel: Model<DepositDocument>,
    @Inject()
    private readonly logger: LoggingService // 注入 LoggingService
  ) { }

  createDepositRecord(createInvestmentDto: CreateInvestmentDto) {
    const result = this.depositModel.create({
      ...createInvestmentDto,
      depositState: '待结息',
      interest: 0,
      createdAt: new Date()
    });
    if (result) {
      return ResponseDto.successWithAutoTip({}, '新增成功');
    }
  }

  async getDepositList(query) {
    const queryData = {};
    let processedList = [];

    query.depositName ? (queryData['depositName'] ={
      $regex:new RegExp(query.depositName, 'i')
    }) : '';
    query.expirationTime ? (queryData['expirationTime'] = {
      $gte: dayjs(query.expirationTime),
      $lt: dayjs(query.expirationTime).add(1, 'day'),
    }) : '';

    const result = await this.depositModel.find({
      ...queryData,
      // expirationTime: {
      //   $gte: dayjs(query.expirationTime),
      //   $lt: dayjs(query.expirationTime).add(1, 'day'),
      // }
    }).lean();
    processedList = result.map((element) => {
      return {
        ...element,
        expirationTime: dayjs(element.expirationTime).format('YYYY-MM-DD'),
      };
    });
    return ResponseDto.success(processedList);
  }

  async editDepositInfo(editDepositInfo) {
    let renewInfo = {};
    const depositInfo = await this.depositModel.findOne({
      _id: editDepositInfo._id,
    })
      .lean();
    if (!depositInfo) {
      return ResponseDto.failureWithAutoTip("请选择正确数据操作")
    }
    //0 续存
    if (editDepositInfo.actiontype == "0") {
      renewInfo = { ...depositInfo }
      renewInfo['amountDeposited'] =new BigNumber(depositInfo.amountDeposited).plus(editDepositInfo.amountDeposited).toNumber();
      renewInfo['expirationTime'] = new Date(editDepositInfo.expirationTime);
      renewInfo['interestRate'] = editDepositInfo.interestRate
    } else if (editDepositInfo.actiontype == "1") {//1 结息
      renewInfo = { ...depositInfo }
      renewInfo['interestRate'] = editDepositInfo.interestRate
      renewInfo['interest'] = editDepositInfo.interest
      renewInfo['gowhere'] = editDepositInfo.gowhere
      renewInfo['depositState'] = '已结息'

    }
    let result = await this.depositModel.updateOne({
      _id: editDepositInfo._id
    }, renewInfo)
    if (result.matchedCount == 1 && result.modifiedCount == 1) {
      return ResponseDto.successWithAutoTip({}, '修改成功')
    } else {
      return ResponseDto.successWithAutoTip({}, '修改失败')
    }
  }

  async updateDepositsInfo(updateInvestmentDto: UpdateInvestmentDto) {
    // return 
    let updateInfo = { ...updateInvestmentDto }
    delete updateInfo._id
    let result = await this.depositModel.updateOne({
      _id: updateInvestmentDto._id
    }, updateInfo)
    if (result.matchedCount == 1 && result.modifiedCount == 1) {
      return ResponseDto.successWithAutoTip({}, '修改成功')
    }
    return ResponseDto.failureWithAutoTip('删除失败')
  }

  async deletedepositinfo(_id: string) {
    let result = await this.depositModel.deleteOne({
      _id: _id
    }).lean()
    if (result.deletedCount == 1) {
      return ResponseDto.successWithAutoTip({}, '删除成功')
    }
    return ResponseDto.failureWithAutoTip('删除失败')

  }


  async depositSummary() {
    let result = await this.depositModel.find()
    console.log(result);
    let unmaturedDeposit = 0//未到期存款
    let currentDeposit = 0 //今年存入的存款，到期时间可能超过当年
    result.forEach(element => {
      if (element.depositState == '待结息') {
        unmaturedDeposit =new BigNumber(unmaturedDeposit).plus(element.amountDeposited).toNumber()
      }
      let currentState = dayjs().isSame(element.expirationTime, 'year')
      if (element.depositState == '待结息' && currentState) {
        currentDeposit =new BigNumber(currentDeposit).plus(element.amountDeposited).toNumber()
      }

    })
    return ResponseDto.success({ unmaturedDeposit })
  }




  // remove(id: number) {
  //   return `This action removes a #${id} investment`;
  // }
}
