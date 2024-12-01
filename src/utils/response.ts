/*
 * @Author: HHG
 * @Date: 2024-11-18 11:38:25
 * @LastEditTime: 2024-12-01 11:31:30
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\utils\response.ts
 * @文件说明:
 */
export class ResponseDto<T> {
  code: string; //业务状态码
  message: string; //业务提示信息
  data: T; //返回值
  meta?: any; // 可以用来存储分页等元数据
  error?: string | null; // 错误信息，失败时才会出现,开发用非业务信息
  constructor(
    data: T,
    code: string,
    message: string,
    meta?: any,
    error?: string | null
  ) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.meta = meta;
    this.error = error;
  }

  /**
   * @description:返回成功方法,带返回值,前端不自动提示
   * @param {string} message 成功提示
   * @param {T} data 数据
   * @param {any} meta 分页等附加
   * @return {*} ResponseDto实例，请求返回
   * @author: 韩宏广
   */
  static success<T>(data: T, meta?: any, message?: string): ResponseDto<T> {
    return new ResponseDto(data, '0', message ? message : '请求成功', meta);
  }
  /**
   * @description: 业务错误，返回code为1,前端不自动提示
   * @param {T} data
   * @param {any} meta
   * @param {string} message
   * @return {*}
   * @author: 韩宏广
   */
  static error<T>(message: string, data?: T, meta?: any): ResponseDto<T> {
    return new ResponseDto(
      data ? data : undefined,
      '1',
      undefined,
      undefined,
      message
    );
  }
  /**
   * @description: 业务成功，返回code为2，前端自动提示
   * @param {T} data
   * @param {any} meta
   * @param {string} message 提示信息
   * @return {*} ResponseDto实例，前端自动提示
   * @author: 韩宏广
   */
  static successWithAutoTip<T>(
    data: T,
    message: string,
    meta?: any
  ): ResponseDto<T> {
    return new ResponseDto(data, '2', message, meta);
  }

  /**
   * @description: 业务失败，返回code为3，前端自动提示
   * @param {string} message 提示信息
   * @param {T} data 数据
   * @param {any} meta 附加信息
   * @return {*} ResponseDto实例，前端自动提示
   * @author: 韩宏广
   */
  static failureWithAutoTip<T>(
    message: string,
    data?: T,
    meta?: any
  ): ResponseDto<T> {
    // console.log(data ? data : {});
    return new ResponseDto(data ? data : ({} as T), '3', message, meta);
  }
}
