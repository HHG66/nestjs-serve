/*
 * @Author: HHG
 * @Date: 2023-12-16 09:05:38
 * @LastEditTime: 2024-12-02 09:02:33
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\common\filters\http-exception.filter.ts
 * @文件说明:
 */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { LoggingService } from '@/global/logger/logging.service';
import { ResponseDto } from '@/utils/response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggingService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // console.log(response);
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();
    // 记录日志（错误消息，错误码，请求信息等）
    let msg = exception.message || (status >= 500 ? 'Service Error' : 'Client Error');
    if (Object.prototype.toString.call(response) === '[object Object]' && response['message']) {
      msg = response['message'];
    }
    const { query, headers, url, method, body } = request;
    if (message && (message as any).statusCode == 400) {
      msg = `${(message as any).error}-${(message as any).message}`;
    }
    this.logger.error(msg);
    if ((message as any).statusCode == 400) {
      //400 是参数相关报错
      // if ((message as any).message == 'Unexpected end of JSON input') {
      //   response.status(status).json(ResponseDto.failureWithAutoTip('入参格式错误'));
      //   return;
      // }
      //如果入参校验不通过，只默认提示第一项
      if ((message as any).message.length > 0) {
        response.status(status).json(ResponseDto.failureWithAutoTip((message as any).message[0].toString()));
        return;
      }
      response.status(status).json(ResponseDto.failureWithAutoTip((message as any).message.toString()));
      return;
    }
    response.status(status).json(message);
  }
}
