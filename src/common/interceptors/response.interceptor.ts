/*
 * @Author: HHG
 * @Date: 2023-12-15 11:20:15
 * @LastEditTime: 2024-11-20 14:39:29
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\common\interceptors\response.interceptor.ts
 * @文件说明:
 */
import { getReqMainInfo } from '@/utils/getReqMainInfo';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  Scope,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Logger } from 'winston';
// import { LoggingService } from '@/global/logger/logging.service';
import { LoggingService } from '@/global/logger/logging.service';

import { Request } from 'express';
import { ResponseDto } from '@/utils/response';
import { catchError } from 'rxjs/operators'; 

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(
    // @Inject() private logger: LoggingService
  // @Inject()
  private readonly logger: LoggingService,
) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('service执行前');
    // const response = context.switchToHttp().getResponse()
    // console.log(response);
    // const test = context.switchToHttp().getRequest();
    // console.log(test);
    // const req = context.switchToHttp().getRequest<Request>();
    // let logger= this.logger
    // console.log("logger,",logger);
    
    return next.handle().pipe(
      map((data) => {
        // console.log(data.data,"data/data");
        // this.logger.log("dddddddd")
        // console.log("logger:", this.logger);
        const req = context.switchToHttp().getRequest();
        // console.log(req.originalUrl); 
        this.logger.log(data.data,req)
       console.log(getReqMainInfo(req as Request),"getReqMainInfo(req as Request),");
       
        // return ""
        return new ResponseDto(
          data.data,
          data.code,
          data.message,
          data.meta,
          data.error
        );
        // if (typeof data == 'string') {
        //   // return {
        //   //   code: '0',
        //   //   message: data,
        //   //   data: {},
        //   // };
        //   // return new ResponseDto(200, 0, {});
        // }
        // this.logger.info('response', {
        //   responseData: data,
        //   req: getReqMainInfo(req as Request),
        // });
        // const resMessage = data.message || '请求成功';
        // const resCode = data.code;
        // delete data.message;
        // if (data.code && data.code !== 0) {
        //   delete data.code;
        //   return {
        //     code: resCode,
        //     error: resMessage,
        //     data: [],
        //   };
        // }
        // return {
        //   code: '0',
        //   message: resMessage,
        //   data: data,
        // };
      })
      // catchError((error) => {
      //   console.log(error);
      //   // console.log(error.getStatus());
      //   // console.log(error.getResponse());
      //   return throwError(() => error);
      // })
    );
  }
}
