/*
 * @Author: HHG
 * @Date: 2023-12-16 09:05:38
 * @LastEditTime: 2024-11-18 20:19:43
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
import { Logger } from 'winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
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

    this.logger.error(msg, {
      status,
      req: getReqMainInfo(request),
    });
    response.status(status).json(message);
  }
}
