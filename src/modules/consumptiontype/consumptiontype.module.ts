import { Module } from '@nestjs/common';
import { ConsumptiontypeService } from './consumptiontype.service';
import { ConsumptiontypeController } from './consumptiontype.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumptionTypeSchema } from '@/model/ConsumptionType.entities';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'consumptionType', schema: ConsumptionTypeSchema }])],
  controllers: [ConsumptiontypeController],
  providers: [ConsumptiontypeService],
})
export class ConsumptiontypeModule {}
