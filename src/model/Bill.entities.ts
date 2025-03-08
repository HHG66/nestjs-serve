import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type BillDocument = HydratedDocument<Bill>;

@Schema()
export class Bill {
  @Prop()
  tradinghours: Date; //交易时间
  @Prop()
  tradetype: string; //交易类型
  @Prop()
  counterparty: string; //交易对方
  @Prop()
  product: string; //商品
  @Prop()
  collectorbranch: string; //	收/支
  @Prop()
  amount: number; //金额(元)
  @Prop()
  patternpayment: string; //支付方式
  @Prop()
  currentstate: string; //当前状态
  @Prop({ required: true, unique: true })
  trasactionid: string; //交易单号
  @Prop()
  merchantstoorder: string; //商户单号
  @Prop()
  billType: string; //账单类型，微信、支付宝
  @Prop()
  remark: string; //备注
  @Prop({ default:()=>new Date() })
  createdAt:Date
  //插入时间
  @Prop()
  updataDate: Date;

  //交易创建时间
  @Prop()
  transactionCreationTime: Date;

  @Prop()
  lastModifiedTime: Date;//最近修改时间

  @Prop()
  sourceTransaction: string;   //交易来源地
 
  @Prop()
  payPattern: string;  //类型 

  @Prop()
  tradingStatus: string; //交易状态

  @Prop()
  serviceCharge: string; //服务费（元）
  
  @Prop()
  successfulRefund: string;  //成功退款（元）

  @Prop()
  fundStatus: string;  //资金状态

}

export const BillSchema = SchemaFactory.createForClass(Bill);
