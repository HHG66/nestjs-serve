
import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestmentDto } from '../../investment/dto/create-investment.dto';
import { IsDateString, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateRepaymentSchedule extends PartialType(CreateInvestmentDto) {
  @IsNotEmpty({ message: '请选择需要修改的数据' })
  _id: string

  @IsNotEmpty({ message: '还款日期不能为空' })
  @IsDateString({},{message:'请输入还款日期'})
  repaymentDate: string; // 还款日期

  @IsNotEmpty({ message: '期初余额不能为空' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: '期初余额必须是数字' })
  @IsPositive({ message: '期初余额必须为正数' })
  initialBalance: number; // 期初余额

  @IsNotEmpty({ message: '计划还款不能为空' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: '计划还款必须是数字' })
  @IsPositive({ message: '计划还款必须为正数' })
  repaymentScheduleAmt: number; // 计划还款

  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: '额外还款必须是数字' })
  @Min(0, { message: '额外还款可以是零或正数' }) // 额外还款可以为零或正数
  additionalRepayment: number; // 额外还款

  @IsNotEmpty({ message: '累计利息不能为空' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: '累计利息必须是数字' })
  @IsPositive({ message: '累计利息必须为正数' })
  accumulatedInterest: number; // 累计利息 之前所有利息的总和

  @IsNotEmpty({ message: '本金不能为空' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: '本金必须是数字' })
  @IsPositive({ message: '本金必须为正数' })
  principal: number; // 本金 还款金额中本金的占比

  @IsNotEmpty({ message: '期终余额不能为空' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: '期终余额必须是数字' })
  @IsPositive({ message: '期终余额必须为正数' }) // 根据实际情况，期终余额也可以为零或负数（如果贷款已还清且有剩余）
  closingBalance: number; // 期终余额

  @IsNotEmpty({ message: '还款状态不能为空' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: '还款状态必须是数字' })
  @Min(0, { message: '还款状态必须是非负数字' }) // 根据实际状态编码，可能需要更具体的验证逻辑
  repaymentStatus: number; // 状态
}
