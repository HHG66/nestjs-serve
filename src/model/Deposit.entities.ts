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

export type DepositDocument = HydratedDocument<Deposit>;

@Schema()
export class Deposit {
  @Prop()
  depositName: string; //存款名称

  @Prop()
  amountDeposited: number; //本金

  @Prop()
  interestRate: number; //利率

  @Prop()
  expirationTime: Date; //到期时间

  @Prop()
  dateCommenced: Date; //开始时间，起始日期

  @Prop()
  remark: string;

  @Prop()
  depositType: string; //存款类型

  @Prop()
  interest: number; //结息 到期利息，不到期或者未提前支取为空

  @Prop()
  depositState: string; //状态

  @Prop()
  gowhere: string; //状态

  @Prop()
  createdAt: Date; //状态
  
}

export const DepositSchema = SchemaFactory.createForClass(Deposit);
