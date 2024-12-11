import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type IncomeTypeDocument = HydratedDocument<IncomeType>;

@Schema()
export class IncomeType {
  @Prop({ required: true, unique: true })
  incomeName: String;

  @Prop(
    raw([
      {
        label: { type: String },
        value: { type: String },
        color: { type: String },
        _id: false,
      },
    ])
  )
  incomeKeyWords: { label: string; value: string; color: string }[];

  @Prop()
  remark: String;
  @Prop({ default: () => new Date() })
  createdAt: Date; //插入时间
  @Prop()
  updataDate: Date;
}

export const IncomeTypeSchema = SchemaFactory.createForClass(IncomeType);
