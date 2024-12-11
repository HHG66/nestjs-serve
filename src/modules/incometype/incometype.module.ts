import { Module } from '@nestjs/common';
import { IncometypeService } from './incometype.service';
import { IncometypeController } from './incometype.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IncomeTypeSchema } from '@/model/incomeType.entities';
// IncomeTypeSchema
@Module({
  imports: [MongooseModule.forFeature([{ name: 'incomeType', schema: IncomeTypeSchema }])],
  controllers: [IncometypeController],
  providers: [IncometypeService],
})
export class IncometypeModule {}
