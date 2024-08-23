/*
 * @Author: HHG
 * @Date: 2023-12-14 11:39:49
 * @LastEditTime: 2024-01-06 16:16:15
 * @LastEditors: 韩宏广
 * @FilePath: \website-nest\src\common\decorators\isPublic.decorator.ts
 * @文件说明: 
 */
import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => {
  return SetMetadata(IS_PUBLIC_KEY, true)
}