// customWinstonLogger.ts
import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class CustomWinstonLogger implements LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(({ timestamp, level, message, context, route, ...meta }) => {
              // 使用传递的 route 信息，若没有则默认值为 'Unknown Route'
              const routeInfo = route || "";
              return `${timestamp} [${level}] ${routeInfo} - ${message}`;
            }),
          ),
        }),
        new winston.transports.DailyRotateFile({
          dirname: 'logs', // 目录可以通过配置获取
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '30d',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(({ timestamp, level, message, context, route, ...meta }) => {
              const routeInfo = route || "";
              return `${timestamp} [${level}] ${routeInfo} - ${message}`;
            }),
          ),
        }),
      ],
    });
  }

  log(message: string | object) {
    if (typeof message === 'object' && (message as any).route) {
      // 如果是对象且包含 route，则提取并使用
      this.logger.info(message['message'], { route: message['route'] });
    } else {
      // 如果是简单字符串，则直接记录
      this.logger.info(message);
    }
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
