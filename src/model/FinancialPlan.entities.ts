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

export type FinancialPlanDocument = HydratedDocument<FinancialPlan>;

@Schema()
export class FinancialPlan {
  @Prop()
  planName: string;
  @Prop()
  planDate: string;

  @Prop({ default: () => new Date() })
  createdAt: Date; //插入时间
}

export const FinancialPlanSchema = SchemaFactory.createForClass(FinancialPlan);
