import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  OnApplicationBootstrap,
  Inject,
} from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggingService
  implements OnModuleInit, OnModuleDestroy, OnApplicationBootstrap
{
  // constructor(@Inject() private readonly logger: Logger) { }
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  onModuleInit() {
    console.log(`项目初始化完成`);
  }

  onModuleDestroy() {
    console.log(`The LoggingService is being destroyed.`);
  }

  onApplicationBootstrap() {
    this.logger.info('启动成功,端口3000');
  }
}
