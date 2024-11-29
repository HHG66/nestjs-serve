import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { LoggingService } from '@/global/logger/logging.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResponseDto } from '@/utils/response';
import { Request } from 'express';
export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly logger: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now(); // 记录请求开始时间
    const req = context.switchToHttp().getRequest<Request>();
    const { method, originalUrl, ip, body, query, headers } = req;

    // 记录请求信息
    // this.logger.log(`Request: ${method} ${originalUrl} - IP: ${ip} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(body)}`, req);

    return next.handle().pipe(
      tap((responseBody) => {
        const duration = Date.now() - now; // 计算响应时间
        const res = context.switchToHttp().getResponse();
        const { statusCode } = res;

        // 构建日志格式
        const logFormat = `${method} ${originalUrl} ${statusCode} ${duration}ms`;
        let loggerInfo = '';
        try {
          loggerInfo = ` Response: ${JSON.stringify(responseBody)}`;
        } catch (error) {
          loggerInfo = ` error: ${error}`;
        }
        // 根据状态码选择日志级别
        if (statusCode >= 500) {
          this.logger.error(
            `${logFormat} -auto - Body: ${JSON.stringify(body)} - ${loggerInfo}`,
            req
          );
        } else if (statusCode >= 400) {
          this.logger.warn(
            `${logFormat} -auto - Body: ${JSON.stringify(body)} - ${loggerInfo}`,
            req
          );
        } else {
          this.logger.log(
            `${logFormat} -auto - Body: ${JSON.stringify(body)}  - ${loggerInfo}`,
            req
          );
        }
      }),
      map((data) => {
        // 转换响应数据为标准格式
        if (!data) {
          return ResponseDto.failureWithAutoTip('程序错误');
        }
        return new ResponseDto(
          data.data,
          data.code,
          data.message,
          data.meta,
          data.error
        );
      })
    );
  }
}
