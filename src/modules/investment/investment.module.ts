import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositSchema } from '@/model/Deposit.entities';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Deposit', schema: DepositSchema }])],
  controllers: [InvestmentController],
  providers: [InvestmentService],
})
export class InvestmentModule {}
