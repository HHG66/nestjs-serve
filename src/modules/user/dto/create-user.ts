/*
 * @Author: HHG
 * @Date: 2023-12-11 19:19:00
 * @LastEditTime: 2024-08-23 17:03:51
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\modules\user\dto\create-user.ts
 * @文件说明: 
 */
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({message:"用户名不能为空"})
  @IsString()
  username:string

  @IsNotEmpty({message:"密码不能为空"})
  @IsString()
  password:string
}
  