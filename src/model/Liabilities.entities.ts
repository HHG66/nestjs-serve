/*
 * @Author: HHG
 * @Date: 2024-12-20 17:16:41
 * @LastEditTime: 2024-12-23 22:24:26
 * @LastEditors: 韩宏广
 * @FilePath: /financial-serve/src/model/Liabilities.entities.ts
 * @文件说明: 
 */
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type LiabilitiesDocument = HydratedDocument<Liabilities>;
// // 定义一个内嵌的对象 Schema
class loanRepaymentScheduleItem {
  @Prop()
  repaymentDate: number //还款日期

  @Prop()
  initialBalance: number //期初余额

  @Prop()
  repaymentScheduleAmt: number   //计划还款

  @Prop()
  additionalRepayment: number   //额外还款

  @Prop()
  accumulatedInterest: number   //累计利息 之前所有利息的总和

  @Prop()
  principal: number   //本金 还款金额中本金的占比

  @Prop()
  closingBalance: number   //期终余额

  @Prop()
  repaymentStatus: number   //状态

}
@Schema()
export class Liabilities {
  @Prop()
  liabilitiesName: string; //贷款单名称

  @Prop()
  amount: number; //负债金额

  @Prop()
  modeRepayment: string; //还款方式

  @Prop()
  interestRate: number; //利率

  @Prop()
  interest: number; //总利息

  @Prop()
  balance: string; //剩余金额

  @Prop()
  remark: string; //备注

  @Prop()
  createdAt: Date; //状态

  @Prop()
  updateTime: Date; //更新时间

  //上面为基础信息，下面字段为贷款单的详细
  @Prop()
  loanPeriod: number; //贷款期限(年限)

  @Prop()
  totalPeriod: number //期数

  @Prop()
  paymentsPerYearNum: number //每年还款次数

  @Prop()
  loanInitiationTime: Date //贷款开始时间

  @Prop()
  currentPeriod: number //当前期数

  //下面为还款单的字段
  @Prop({ type: [loanRepaymentScheduleItem], default: () => [] }) 
  loanRepaymentSchedule: loanRepaymentScheduleItem[]

}



export const LiabilitiesSchema = SchemaFactory.createForClass(Liabilities);
