/*
 * @Author: HHG
 * @Date: 2024-08-27 20:06:12
 * @LastEditTime: 2024-12-01 16:25:44
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\entities\consumptionType.entities.ts
 * @文件说明:
 */
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type ConsumptionTypeDocument = HydratedDocument<ConsumptionType>;

// 定义一个内嵌的对象 Schema
const ItemSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
@Schema()
export class ConsumptionType {
  @Prop({ required: true, unique: true })
  consumptionTypeName: String;

  @Prop(
    raw([
      {
        label: { type: String },
        value: { type: String },
        color: { type: String },
        _id:false
      },
    ])
  )
  productKeyWords: { label: string; value: string; color: string }[];

  @Prop()
  remark: String;
  @Prop({ default: () => new Date() })
  createdAt: Date; //插入时间
  @Prop()
  updataDate: Date;
}

export const ConsumptionTypeSchema =
  SchemaFactory.createForClass(ConsumptionType);
