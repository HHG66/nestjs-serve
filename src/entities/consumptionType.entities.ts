/*
 * @Author: HHG
 * @Date: 2024-08-27 20:06:12
 * @LastEditTime: 2024-11-22 18:12:32
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\entities\consumptionType.entities.ts
 * @文件说明:
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type ConsumptionTypeDocument = HydratedDocument<ConsumptionType>;

@Schema()
export class ConsumptionType {
  @Prop({ required: true, unique: true})
  consumptionTypenName: String
  @Prop()
  productKeyWords: string[]
  @Prop()
  remark:String
  @Prop({ default:()=>new Date() })
  createdAt:Date//插入时间
  @Prop()
  updataDate: Date;
}

export const ConsumptionTypeSchema = SchemaFactory.createForClass(ConsumptionType);