import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import {  ValidationPipe } from '@/common/pipes/validation.pipe';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  const LoggerInstant = app.get(WINSTON_MODULE_PROVIDER) as Logger;
  //全局管道
  app.useGlobalPipes(new ValidationPipe());

  //全局守卫
  // app.useGlobalGuards(JwtStrategy);
  //全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor(LoggerInstant));
  //全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter(LoggerInstant));

  await app.listen(3000);
}

bootstrap();
