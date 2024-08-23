import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guards';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ConfigModule } from '@nestjs/config';
import database from './config/database.config';
//配置文件相关
import { ConfigService } from '@nestjs/config'
import logconfig from './config/log.config';
import jwtConfig from './config/jwt.config'
import { Modules } from '@/modules/modules';
import { LoggingService } from "@/lifeCycle"

import { UserModule } from '@/modules/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database, logconfig, jwtConfig],
    }),
    //数据库配置
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        let uri = configService.get<string>('MONGODB_URI')
        return { uri }
      },
      inject: [ConfigService],
    }),
    //日志配置
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transports: [
          new winston.transports.DailyRotateFile({
            dirname: configService.get<string>('DIE_NAME'), // 日志保存的目录
            filename: configService.get<string>('FILE_NAME'), // 日志名称，占位符 %DATE% 取值为 datePattern 值。
            datePattern: configService.get<string>('DATE_PATTERN'), // 日志轮换的频率，此处表示每天。
            zippedArchive: configService.get<boolean>('ZIPPEDARCHIVE'), // 是否通过压缩的方式归档被轮换的日志文件。
            maxSize: configService.get<string>('MAXSIZE'), // 设置日志文件的最大大小，m 表示 mb 。
            maxFiles: configService.get<string>('MAXFILES'), // 保留日志文件的最大天数，此处表示自动删除超过 1 天的日志文件。
            // 记录时添加时间戳信息
            format: winston.format.combine(
              winston.format.timestamp({
                format: configService.get<string>('FORMAT'),
              }),
              winston.format.json(),
            ),
          }),
        ]
      }),
      inject: [ConfigService]
    }),
    Modules
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
  //注册全局守卫
  providers: [
    LoggingService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }