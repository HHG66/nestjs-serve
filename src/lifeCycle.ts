import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  OnApplicationBootstrap,
  Inject,
} from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CustomWinstonLogger } from './utils/customWinstonLogger';
import { loggingStatic } from './global/logger/loggingStatic.service';

@Injectable()
export class LifeCycle
  implements OnModuleInit, OnModuleDestroy, OnApplicationBootstrap {
  // constructor(@Inject() private readonly logger: Logger) { }
  constructor(
    @Inject()
    private readonly logger: CustomWinstonLogger
  ) { }
  onModuleInit() {
    const Logger = new loggingStatic(this.logger);
    Logger.log(`项目初始化完成，环境:${process.env.NODE_ENV}`);

    // console.log(connectionResult);
  }

  onModuleDestroy() {
    console.log(`The Serve is being destroyed.`);
  }

  onApplicationBootstrap() {
    // this.logger.info('启动成功,端口3000');
  }
}
