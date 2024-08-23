/*
 * @Author: HHG
 * @Date: 2023-12-15 09:49:50
 * @LastEditTime: 2023-12-16 15:02:53
 * @LastEditors: 韩宏广
 * @FilePath: \website\src\utils\cryptogram.ts
 * @文件说明: 
 */
import * as bcrypt from 'bcrypt';

/**
 * @description: 生成hash函数,加密
 * @param {string} str
 * @param {string|number} salt 字符串就是加密的盐，数字代表加密的轮数，推介10
 * @return {string} 加密的数据
 * @author: 韩宏广
 */
export const encryption = (str:string,salt?:string|number): string => {
  return bcrypt.hashSync(str, salt||10);
}
/**
 * @description: 对比加密字符串和字符串是否是同一个
 * @param {string} str 需要比对的字符串
 * @param {string} hashStr 经过hash加密的字符串
 * @return {boolean} 对比结果
 * @author: 韩宏广
 */
export const compare=(str:string,hashStr:string):boolean=>{
  return bcrypt.compareSync(str,hashStr)
}
