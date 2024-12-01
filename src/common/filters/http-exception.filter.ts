/*
 * @Author: HHG
 * @Date: 2023-12-16 09:05:38
 * @LastEditTime: 2024-12-01 09:33:33
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\common\filters\http-exception.filter.ts
 * @文件说明:
 */
import { getReqMainInfo } from '@/utils/getReqMainInfo';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { LoggingService } from '@/global/logger/logging.service';
import { ResponseDto } from '@/utils/response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggingService
  ) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // console.log(response);
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();
    // 记录日志（错误消息，错误码，请求信息等）
    let msg =
      exception.message || (status >= 500 ? 'Service Error' : 'Client Error');
    if (
      Object.prototype.toString.call(response) === '[object Object]' &&
      response['message']
    ) {
      msg = response['message'];
    }
    const { query, headers, url, method, body } = request;
    if (message && (message as any).statusCode == 400) {
      msg = `${(message as any).error}-${(message as any).message}`;
    }
    this.logger.error(msg);
    if ((message as any).statusCode == 400) {
      response
        .status(status)
        .json(ResponseDto.failureWithAutoTip((message as any).message[0].toString()));
        return 
    }
    response.status(status).json(message);
  }
}
