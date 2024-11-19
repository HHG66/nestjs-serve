import { Module, Global } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { CustomWinstonLogger } from '@/utils/customWinstonLogger';

@Global()
@Module({
  providers: [LoggingService,CustomWinstonLogger],
  exports: [LoggingService,CustomWinstonLogger],
})
export class LoggerModule {}