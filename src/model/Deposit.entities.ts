/*
 * @Author: HHG
 * @Date: 2024-12-16 17:13:10
 * @LastEditTime: 2025-01-14 17:39:11
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\model\Deposit.entities.ts
 * @文件说明:
 */
/*
 * @Author: HHG
 * @Date: 2024-08-27 20:06:12
 * @LastEditTime: 2024-08-27 20:06:16
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\entities\user.schemas.ts
 * @文件说明:
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type DepositDocument = HydratedDocument<Deposit>;

@Schema()
export class Deposit {
  @Prop()
  depositName: string; //存款名称

  @Prop()
  amountDeposited: number; //本金（本金总金额） 因为增加了存款的详细信息，如果存在详细信息则需要计算

  @Prop()
  interestRate: number; //利率  （可选） 如果计算不清楚结息类型可以选浮动

  @Prop()
  expirationTime: Date; //到期时间

  @Prop()
  dateCommenced: Date; //开始时间，起始日期

  @Prop()
  remark: string;

  @Prop()
  depositType: string; //存款类型，关键字段根据类型有不同的规则和字段 
  // 活期存款01、 定期存款02、零存整取03、目标存款04、存本取息05
  // 零存整取：每月存入固定金额，到期一次性支取本息。
  @Prop()
  interest: number; //结息 到期利息，不到期或者未提前支取为空

  @Prop()
  depositState: string; //状态  待结息，已结息

  @Prop()
  gowhere: string; //去向

  @Prop()
  createdAt: Date; //创建时间

  @Prop()
  depositRecords: Array<DepositRecords> //存款详细

  @Prop()
  targetAmount: number;  //（可选） 目标存款金额（针对目标存款类型）
  
  @Prop()
  account: string  //存款账户
  
  @Prop()
  term: Date //（可选）：存款期限（针对定期存款类型）
 
}

//定期存款、定投存款、目标存款生成下列信息，活期不生成
class DepositRecords {
  @Prop()
  depositDate: Date;//存款日期

  @Prop()
  depositRecordAmount: number; //金额

  @Prop()
  remark: string;  
  
}


export const DepositSchema = SchemaFactory.createForClass(Deposit);
