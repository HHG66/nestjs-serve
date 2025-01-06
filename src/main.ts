import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import {  ValidationPipe } from '@/common/pipes/validation.pipe';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import { Logger } from 'winston';
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
  WinstonLogger,
} from 'nest-winston';
import { LoggingService } from './global/logger/logging.service';
import { CustomWinstonLogger } from './utils/customWinstonLogger';

async function bootstrap() {
  // console.log(process.env.NODE_ENV == 'development');
  const app = await NestFactory.create(AppModule, {
    // snapshot: true,
    logger: ['log', 'warn', 'error'],
  });
  // const LoggerInstant = app.get(WINSTON_MODULE_PROVIDER) as Logger;

  //全局管道
  // app.useGlobalPipes(new ValidationPipe());

  //全局守卫
  // app.useGlobalGuards(JwtStrategy);
  //全局拦截器
  // app.useGlobalInterceptors(new ResponseInterceptor(new LoggingService(new CustomWinstonLogger(),Request)));
  // const loggingService = app.get(LoggingService); // 获取 LoggingService 实例
  // const loggingService = app.resolve(LoggingService); // 获取 LoggingService 实例
  const loggingService = await app.resolve(LoggingService); // 正确

  app.useGlobalInterceptors(new ResponseInterceptor(loggingService));

  //全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter(loggingService));

  // app.useLogger(LoggerInstant);
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // 设置请求体的最大大小为 10MB
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  await app.listen(3001);
}

bootstrap();
