import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guards';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ConfigModule } from '@nestjs/config';
import database from './config/database.config';
//配置文件相关
import { ConfigService } from '@nestjs/config';
import logconfig from './config/log.config';
import jwtConfig from './config/jwt.config';
import { Modules } from '@/modules/modules';
import { LifeCycle } from '@/lifeCycle';
import { LoggerMiddleware } from '@/common/middleware/LoggerMiddleware';
import { CustomWinstonLogger } from '@/utils/customWinstonLogger';
import { LoggerModule } from '@/global/logger/logger.module';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database, logconfig, jwtConfig],
    }),
    //数据库配置
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService,CustomWinstonLogger:CustomWinstonLogger) => {
        const uri = configService.get<string>('MONGODB_URI');
        const serverSelectionTimeoutMS=configService.get<number>("serverSelectionTimeoutMS")
        try {
          // 连接MongoDB
          const connection = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: serverSelectionTimeoutMS,  // 设置超时时间
          }); 
    
          // 监听错误事件
          connection.connection.on('error', (err) => {
            Logger.error(`MongoDB connection error: ${err.message}`, err.stack);
          });
    
          connection.connection.on('disconnected', () => {
            Logger.warn('MongoDB disconnected');
          });
    
        } catch (error) {
          // Logger.error(`Failed to connect to MongoDB: ${error.message}`, error.stack);
          // console.log(`${error.message}`, error.stack);
          // console.log();
          Logger.error(`MongoDB connection error: ${error.message}`, error.stack);
          CustomWinstonLogger.error(`${error.message}`, error.stack)
          // throw new Error('MongoDB connection failed');
        }

        return { uri,serverSelectionTimeoutMS };
      },
      inject: [ConfigService,CustomWinstonLogger],
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URI')
    //   }),
    //   inject: [ConfigService],
    // }),
    //引入模块
    Modules,
    //日志配置
    // WinstonModule.forRoot({
    //   transports: [
    //     // new winston.transports.Console(),
    //     new winston.transports.Console({
    //       format: winston.format.combine(
    //         winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    //         // winston.format.printf(
    //         //   ({ timestamp, level, message, context, ...meta }) => {
    //         //     return `${timestamp} [${level}]  - ${message}`;
    //         //   }
    //         // )
    //       ),
    //     }),
    //   ],
    // }),
    // WinstonModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     transports: [
    //       new winston.transports.Console({
    //         format: winston.format.combine(
    //           winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    //           // winston.format.printf(({ timestamp, level, message, context, ...meta }) => {
    //           //   console.log(meta);
    //           //   const route = meta?.route || 'Unknown Route';
    //           //   return `${timestamp} [${level}] ${route} - ${message}`;
    //           // }),
    //           winston.format.printf(({ timestamp, level, message, context, ...meta }) => {
    //             // 添加路由信息
    //             const route = meta?.route || "";
    //             // console.log("route",route);
    //             return `${timestamp} [${level}] ${route} - ${message}`;
    //           }),
    //         ),
    //       }),
    //       // new winston.transports.DailyRotateFile({
    //       //   dirname: configService.get<string>('DIE_NAME'), // 日志保存的目录
    //       //   filename: configService.get<string>('FILE_NAME'), // 日志名称，占位符 %DATE% 取值为 datePattern 值。
    //       //   datePattern: configService.get<string>('DATE_PATTERN'), // 日志轮换的频率，此处表示每天。
    //       //   zippedArchive: configService.get<boolean>('ZIPPEDARCHIVE'), // 是否通过压缩的方式归档被轮换的日志文件。
    //       //   maxSize: configService.get<string>('MAXSIZE'), // 设置日志文件的最大大小，m 表示 mb 。
    //       //   maxFiles: configService.get<string>('MAXFILES'), // maxFiles 用于限制保留的日志文件的数量，而不是天数
    //       //   // 记录时添加时间戳信息
    //       //   // format: winston.format.combine(
    //       //   //   winston.format.timestamp({
    //       //   //     format: configService.get<string>('FORMAT'),
    //       //   //   }),
    //       //   //   winston.format.json()
    //       //   // ),
    //       //   format: winston.format.combine(
    //       //     winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    //       //     winston.format.printf(({ timestamp, level, message, context, ...meta }) => {
    //       //       // console.log( timestamp, level, message, context, meta);

    //       //       const route = meta?.route || "";
    //       //       return `${timestamp} [${level}] ${route} - ${message}`;
    //       //     }),
    //       //   ),

    //       // }),
    //       // new winston.transports.DailyRotateFile({
    //       //   dirname: 'logs',
    //       //   filename: '%DATE%.log',
    //       //   datePattern: 'YYYY-MM-DD',
    //       //   maxFiles: '30d',
    //       //   format: winston.format.combine(
    //       //     winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    //       //     winston.format.printf(({ timestamp, level, message, route, ...meta }) => {
    //       //       const routeInfo = route || 'Unknown Route';
    //       //       return `${timestamp} [${level}] ${routeInfo} - ${message}`;
    //       //     }),
    //       //   ),
    //       // }),
    //     ],
    //   }),
    //   inject: [ConfigService],
    // }),
    // UserModule
    // LoginModule,
    // AuthModule,
    // ArticleModule,
    // ClassificationModule,
    // AtlasModule,
    // MulterModule.register({
    //   storage: {
    //   },
    // }),
  ],
  controllers: [],
  providers: [
    CustomWinstonLogger, // 注册自定义的WinstonLogger
    LifeCycle,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, //注册全局守卫
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseInterceptor, // 设置为全局拦截器
    // },
  ],
  exports: [CustomWinstonLogger], // 导出 Logger，供其他模块使用
})
export class AppModule {
  // //注册中间件
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddleware) // 使用LoggerMiddleware
  //     .forRoutes('*'); // 对所有路由应用该中间件
  // }
}
