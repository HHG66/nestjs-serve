import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BillSchema } from '@/model/Bill.entities';
import { CustomWinstonLogger } from '@/utils/customWinstonLogger'; // 确保路径正确
import { LoggingService } from '@/global/logger//logging.service';
import { BillingBatchSchema } from '@/model/BillingBatch.entities';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Bill', schema: BillSchema }]),MongooseModule.forFeature([{ name: 'BillingBatch', schema: BillingBatchSchema }])],
  controllers: [BillController],
  providers: [BillService,CustomWinstonLogger,LoggingService],
})
export class BillModule {}
