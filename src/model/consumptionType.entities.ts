/*
 * @Author: HHG
 * @Date: 2024-08-27 20:06:12
 * @LastEditTime: 2025-02-23 11:35:54
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\model\ConsumptionType.entities.ts
 * @文件说明:
 */
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type ConsumptionTypeDocument = HydratedDocument<ConsumptionType>;


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
        _id: false
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

export const ConsumptionTypeSchema = SchemaFactory.createForClass(ConsumptionType);
