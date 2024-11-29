import { LoggingService } from '@/global/logger/logging.service';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
// import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // private logger = new Logger();
  constructor(
    // @Inject() private logger: LoggingService
  // @Inject()
  private readonly logger: LoggingService,
) {}
  use(req: Request, res: Response, next: NextFunction) {
    // 记录开始时间
    const start = Date.now();
    // 获取请求信息
    const { method, originalUrl, ip, httpVersion, headers ,body,} = req;
    console.log(req);
    
    // 获取响应信息
    const { statusCode } = res;


    // 保存原始的 res.send 方法
    const originalSend = res.send;

    // 用来存储响应内容
    let responseBody: any;

    res.send = function (body: any) {
      responseBody = body; // 捕获响应内容
      return originalSend.apply(this, arguments); // 调用原始的 send 方法
    };
    res.on('finish', () => {
      // 记录结束时间
      const end = Date.now();
      // 计算时间差
      const duration = end - start;
          
      // 这里可以根据自己需要组装日志信息：[timestamp] [method] [url] HTTP/[httpVersion] [client IP] [status code] [response time]ms [user-agent]
      // const logFormat = ` ${method} ${originalUrl} HTTP/${httpVersion} ${ip} ${statusCode} ${duration}ms}`;
      const logFormat = ` ${method} ${originalUrl}  ${statusCode} ${duration}ms`;

      // 打印日志，包括响应内容
      if (statusCode >= 500) {
        this.logger.error(`${logFormat} - Response: ${JSON.stringify(responseBody)}`, req);
      } else if (statusCode >= 400) {
        this.logger.warn(`${logFormat} - Response: ${JSON.stringify(responseBody)}`, req);
      } else {
        this.logger.log(`${logFormat} - Response: ${JSON.stringify(responseBody)}`, req);
      }
    });

    next();
  }
}
