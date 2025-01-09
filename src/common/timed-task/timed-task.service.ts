// import { CreateTimedTaskDto } from './dto/create-timed-task.dto';
// import { UpdateTimedTaskDto } from './dto/update-timed-task.dto';
// import { LoggingService } from '@/global/logger/logging.service';
// import { FinancialPlanDocument } from '@/model/FinancialPlan.entities';
// import { Inject, Injectable, Logger } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import { Model } from 'mongoose';

// @Injectable()
// export class TimedTaskService {
//    constructor(
//       @InjectModel('FinancialPlan')
//       private financialPlanModel: Model<FinancialPlanDocument>,
//       @Inject()
//       private readonly logger: LoggingService // 注入 LoggingService
//     ) { 
//       console.log('---011');
      
//     }
    
//   //每日凌晨1点执行（使用字符串表达式）
//   // @Cron('0 1 * * *')
//   // handleCron() {
    
//   // }

//   @Cron(CronExpression.EVERY_SECOND)
//   test() {
//       console.log('11');
//   }
// }


import { loggingStatic } from '@/global/logger/loggingStatic.service';
import { FinancialPlanDocument } from '@/model/FinancialPlan.entities';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';

@Injectable()
export class TimedTaskService {
  constructor(
    @InjectModel('FinancialPlan') private financialPlanModel: Model<FinancialPlanDocument>,
    // @Inject() 
    private readonly logger: loggingStatic,
  ) {
    console.log('TimedTaskService 实例化成功');
  }
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
