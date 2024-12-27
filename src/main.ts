import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import {  ValidationPipe } from '@/common/pipes/validation.pipe';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { Logger } from 'winston';
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
  WinstonLogger,
} from 'nest-winston';
import { LoggingService } from './global/logger/logging.service';
import { CustomWinstonLogger } from './utils/customWinstonLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // snapshot: true,
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

  await app.listen(3000);
}

bootstrap();
