import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type BillDocument = HydratedDocument<Bill>;

@Schema()
export class Bill {
  @Prop()
  tradinghours: string; //交易时间
  @Prop()
  tradetype: string; //交易类型
  @Prop()
  counterparty: string; //交易对方
  @Prop()
  product: string; //商品
  @Prop()
  collectorbranch: string; //	收/支
  @Prop()
  amount: string; //金额(元)
  @Prop()
  patternpayment: string; //支付方式
  @Prop()
  currentstate: string; //当前状态
  @Prop({ required: true, unique: true })
  trasactionid: string; //交易单号
  @Prop()
  merchantstoorder: string; //商户单号
  @Prop()
  remark: string; //备注
  @Prop()
  updataDate: Date;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
