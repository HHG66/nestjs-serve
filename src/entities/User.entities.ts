/*
 * @Author: HHG
 * @Date: 2024-08-27 20:06:12
 * @LastEditTime: 2024-08-27 20:06:16
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\entities\user.schemas.ts
 * @文件说明: 
 */
/*
 * @Author: HHG
 * @Date: 2023-12-11 18:11:15
 * @LastEditTime: 2023-12-12 09:19:32
 * @LastEditors: 韩宏广
 * @FilePath: \website\src\login\schemas\user.schemas.ts
 * @文件说明: 
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: number;

  @Prop()
  password: string;
  
  @Prop()
  createDate:Date
  
  @Prop()
  updataDate:Date

}

export const UsrSchema = SchemaFactory.createForClass(User);