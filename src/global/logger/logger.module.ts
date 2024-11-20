import { Module, Global } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { CustomWinstonLogger } from '@/utils/customWinstonLogger';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  providers: [LoggingService,CustomWinstonLogger,ConfigModule],
  exports: [LoggingService,CustomWinstonLogger],
})
export class LoggerModule {}