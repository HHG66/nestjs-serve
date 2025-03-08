/*
 * @Author: HHG
 * @Date: 2025-03-09 00:43:46
 * @LastEditTime: 2025-03-09 01:15:12
 * @LastEditors: 韩宏广
 * @FilePath: /financial-serve/src/model/BillingBatch.entities.ts
 * @文件说明: 
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type BillingBatchDocument = HydratedDocument<BillingBatch>;


@Schema()
export class BillingBatch {

  // 导入时间
  @Prop({ type: Date, required: true })
  importtime: Date;

  // 账单类型
  @Prop({ type: String, required: true })
  billtype: string;

  // 总业务数
  @Prop({ type: Number, required: true })
  businesstotal: number;
  
  //账单idList
  @Prop({ type: [mongoose.Schema.Types.ObjectId], required: true })
  billidList: mongoose.Schema.Types.ObjectId[];

  //创建时间
  @Prop({ default: () => new Date() })
  createdAt: Date
}

export const BillingBatchSchema = SchemaFactory.createForClass(BillingBatch);