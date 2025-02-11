/*
 * @Author: HHG
 * @Date: 2025-01-09 23:43:43
 * @LastEditTime: 2025-02-11 18:20:02
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\global\logger\loggingStatic.service.ts
 * @文件说明: 
 */
// logging.service.ts
import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core'; // 从 @nestjs/core 导入 REQUEST
import { Request } from 'express';
import { CustomWinstonLogger } from '@/utils/customWinstonLogger';

// @Injectable({ scope: Scope.REQUEST }) // 确保服务在每个请求中有不同的实例
@Injectable() 
export class loggingStatic {
  request: any;
  constructor(
    private readonly logger: CustomWinstonLogger,
    // @Inject(REQUEST) private readonly request: Request // 注入请求对象
  ) {}

  log(message: any, req?: Request) {
    const route =this.request&& this.request.originalUrl? this.request.originalUrl:req?.originalUrl; // 获取请求的路由
    this.logger.log(message, route);
  }
  // log(message: string, req?: Request) {
  //   const route =this.request.originalUrl
  //   this.logger.log(message, route);
  // }

  error(message: any, req?: Request) {
    const route = this.request&&this.request.originalUrl? this.request.originalUrl:req?.originalUrl; // 获取请求的路由
    let errorInfo:any
    try {
      errorInfo= JSON.stringify(message)
    } catch (error) {
      errorInfo=message
    }
    this.logger.error(errorInfo , route);
  }

  warn(message: string, req?: Request) {
    const route = this.request&&this.request.originalUrl? this.request.originalUrl:req?.originalUrl; // 获取请求的路由
    this.logger.warn(message, route);
  }
}
