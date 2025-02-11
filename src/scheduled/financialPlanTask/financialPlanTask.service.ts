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
    @Inject() 
    private readonly logger: loggingStatic,
  ) { }
  @Cron('* * * * * *')
 async handleCron() {
  // private readonly logger = new LoggingService(TasksService.name);
    // console.log('定时任务执行');
    // this.logger.log('每秒定时任务执行')
    // console.log(await this.financialPlanModel.find().lean());
  }

  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  @Cron('* * * * * *')
  async handleCronTask() {
    //查询计划单生效日期，当前日期大于生效日期，根据周期生成新的计划单
   let planNameList= await  this.financialPlanModel.find()
   let result= await  this.financialPlanModel.find(
    {
      planDate: {
        $lte: new Date(),
      },
    }
    ).sort({ planDate: 1 })
    // this.logger.log(result)
    // this.logger.log('---')
    
    
   }
}
