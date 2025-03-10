// custom-winston-logger.ts
import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomWinstonLogger {
  private readonly logger: winston.Logger;

  constructor(private readonly configService: ConfigService) {
    // 动态构建 transports 数组
    const transports: winston.transport[] = [];

    // 根据环境决定是否启用 Console 传输
    const isConsoleEnabled = process.env.NODE_ENV === 'development';
    if (isConsoleEnabled) {
      transports.push(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
              ({ timestamp, level, message, context, ...meta }) => {
                const route = meta.route || '';
                return `${timestamp} [${level}]-${message} ${route} `;
              }
            )
          ),
        })
      );
    }

    // 始终启用 DailyRotateFile 传输
    transports.push(
      new winston.transports.DailyRotateFile({
        dirname: this.configService.get<string>('DIE_NAME'),
        filename: this.configService.get<string>('FILE_NAME'),
        datePattern: this.configService.get<string>('DATE_PATTERN'),
        zippedArchive: this.configService.get<boolean>('ZIPPEDARCHIVE'),
        maxSize: this.configService.get<string>('MAXSIZE'),
        maxFiles: this.configService.get<string>('MAXFILES'),
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.printf(
            ({ timestamp, level, message, context, ...meta }) => {
              const route = meta?.route || '';
              return `${timestamp} [${level}] ${route} - ${message}`;
            }
          )
        ),
      })
    );

    this.logger = winston.createLogger({
      transports: transports, // 使用动态构建的 transports
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
