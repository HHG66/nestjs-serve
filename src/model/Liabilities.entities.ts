/*
 * @Author: HHG
 * @Date: 2024-12-20 17:16:41
 * @LastEditTime: 2024-12-20 17:33:09
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\model\Liabilities.entities.ts
 * @文件说明: 
 */
/*
 * @Author: HHG
 * @Date: 2024-12-16 17:13:10
 * @LastEditTime: 2024-12-19 16:23:20
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\model\Deposit.entities.ts
 * @文件说明:
 */
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

export type LiabilitiesDocument = HydratedDocument<Liabilities>;

@Schema()
export class Liabilities {
  @Prop()
  liabilitiesName: string; //贷款单名称

  @Prop()
  amount: number; //负债金额

  @Prop()
  modeRepayment: string; //还款方式

  @Prop()
  interestRate: number; //利率

  @Prop()
  interest: number; //总利息

  @Prop()
  balance: string; //剩余金额

  @Prop()
  remark: string; //备注

  @Prop()
  createdAt: Date; //状态

  @Prop()
  updateTime: Date; //更新时间
  
}

export const LiabilitiesSchema = SchemaFactory.createForClass(Liabilities);
