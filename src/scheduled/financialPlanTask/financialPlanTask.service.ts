import { loggingStatic } from '@/global/logger/loggingStatic.service';
import { FinancialPlanDocument } from '@/model/FinancialPlan.entities';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';

@Injectable()
export class financialPlanTaskService {
  constructor(
    @InjectModel('FinancialPlan') private financialPlanModel: Model<FinancialPlanDocument>,
    // @Inject() 
    private readonly logger: loggingStatic,
  ) { }
  @Cron('* * * * * *')
 async handleCron() {
  // private readonly logger = new LoggingService(TasksService.name);
    // console.log('定时任务执行');
    // this.logger.log('每秒定时任务执行')
    // console.log(await this.financialPlanModel.find().lean());
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCronTask() {
    //查询预算日期是否超时超过设置状态，代表当前预算已执行
    //执行之后
   }
}
