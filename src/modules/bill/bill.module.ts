import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BillSchema } from '@/entities/Bill.entities';
import { CustomWinstonLogger } from '@/utils/customWinstonLogger'; // 确保路径正确
import { LoggingService } from '@/global/logger//logging.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Bill', schema: BillSchema }])],
  controllers: [BillController],
  providers: [BillService,CustomWinstonLogger,LoggingService],
})
export class BillModule {}
