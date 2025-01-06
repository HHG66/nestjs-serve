import { Module } from '@nestjs/common';
import { FinancialplanService } from './financialplan.service';
import { FinancialplanController } from './financialplan.controller';
import { FinancialPlanSchema } from '@/model/FinancialPlan.entities';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'FinancialPlan', schema: FinancialPlanSchema }])],
  controllers: [FinancialplanController],
  providers: [FinancialplanService],
})
export class FinancialplanModule {}
