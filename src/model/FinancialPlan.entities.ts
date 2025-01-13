/*
 * @Author: HHG
 * @Date: 2024-08-27 20:06:12
 * @LastEditTime: 2025-01-11 00:06:56
 * @LastEditors: 韩宏广
 * @FilePath: /financial-serve/src/model/FinancialPlan.entities.ts
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
  planDate: Date; //日期，按照周期得到对应的计划,也是第一次预算生效时间

  @Prop()
  incomePattern: string; //收入方式

  @Prop()
  expenditurePattern: string; //收入方式

  @Prop()
  period: string; //周期
  // {
  //   value: 'einmal',
  //   label: '单次',
  // },
  // {
  //   value: 'month',
  //   label: '月度',
  // },
  // {
  //   value: 'quarter',
  //   label: '季度',
  // },
  // {
  //   value: 'year',
  //   label: '年度',
  // },
  @Prop()
  amount: number; //金额

  @Prop()
  periodStartDate: Date; //周期开始时间

  @Prop()
  periodEndDate: Date; //周期结束时间

  @Prop()
  associationType:mongoose.Types.ObjectId

  @Prop({ default: () => new Date() })
  createdAt: Date; //插入时间
}

export const FinancialPlanSchema = SchemaFactory.createForClass(FinancialPlan);
