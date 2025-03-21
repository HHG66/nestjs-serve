import { Module } from '@nestjs/common';
import { financialPlanTaskService } from './financialPlanTask.service';
// import { TimedTaskController } from './timed-task.controller';
import { FinancialPlanSchema } from '@/model/FinancialPlan.entities';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { loggingStatic } from '@/global/logger/loggingStatic.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: 'FinancialPlan', schema: FinancialPlanSchema }]),  // 确保 FinancialPlan 被正确导入
  ],
  providers: [financialPlanTaskService,loggingStatic],
})
export class TimedTaskModule {}
