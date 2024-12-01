// custom-winston-logger.ts
import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomWinstonLogger {
  private readonly logger: winston.Logger;

  constructor(private readonly configService: ConfigService) {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
              ({ timestamp, level, message, context, ...meta }) => {
                const route = meta.route || ''; // 获取路由信息
                // return `${timestamp} [${level}] ${route} - ${message}`;
                return `${timestamp} [${level}]-${message} ${route} `;
              }
            )
          ),
        }),
        // new winston.transports.DailyRotateFile({
        //   dirname: 'logs',
        //   filename: '%DATE%.log',
        //   datePattern: 'YYYY-MM-DD',
        //   maxFiles: '30d',
        //   format: winston.format.combine(
        //     winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        //     winston.format.printf(
        //       ({ timestamp, level, message, route, ...meta }) => {
        //         const routeInfo = route || 'Unknown Route';
        //         return `${timestamp} [${level}] ${routeInfo} - ${message}`;
        //       }
        //     )
        //   ),
        // }),
        new winston.transports.DailyRotateFile({
          dirname: this.configService.get<string>('DIE_NAME'), // 日志保存的目录
          filename: this.configService.get<string>('FILE_NAME'), // 日志名称，占位符 %DATE% 取值为 datePattern 值。
          datePattern: this.configService.get<string>('DATE_PATTERN'), // 日志轮换的频率，此处表示每天。
          zippedArchive: this.configService.get<boolean>('ZIPPEDARCHIVE'), // 是否通过压缩的方式归档被轮换的日志文件。
          maxSize: this.configService.get<string>('MAXSIZE'), // 设置日志文件的最大大小，m 表示 mb 。
          maxFiles: this.configService.get<string>('MAXFILES'), // maxFiles 用于限制保留的日志文件的数量，而不是天数
          // 记录时添加时间戳信息
          // format: winston.format.combine(
          //   winston.format.timestamp({
          //     format: configService.get<string>('FORMAT'),
          //   }),
          //   winston.format.json()
          // ),
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
              ({ timestamp, level, message, context, ...meta }) => {
                // console.log( timestamp, level, message, context, meta);

                const route = meta?.route || '';
                return `${timestamp} [${level}] ${route} - ${message}`;
              }
            )
          ),
        }),
      ],
    });
  }

  log(message: string, route: string): void {
    this.logger.log('info', message, { route }); // 传递路由作为 meta
  }

  error(message: string, route: string): void {
    this.logger.log('error', message, { route });
  }

  warn(message: string, route: string): void {
    this.logger.log('warn', message, { route });
  }
}
