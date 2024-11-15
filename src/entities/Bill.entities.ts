import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type BillDocument = HydratedDocument<Bill>;

@Schema()
export class Bill {
  @Prop()
  tradinghours: string;
  @Prop()
  tradetype: string;
  @Prop()
  counterparty: string;
  @Prop()
  product: string;
  @Prop()
  collectorbranch: string;
  @Prop()
  amount: string;
  @Prop()
  patternpayment: string;
  @Prop()
  currentstate: string;
  @Prop()
  trasactionid: string;
  @Prop()
  merchantstoorder: string;
  @Prop()
  remark: string;
  @Prop()
  updataDate: Date;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
