import { loggingStatic } from '@/global/logger/loggingStatic.service';
import { FinancialPlanDocument } from '@/model/FinancialPlan.entities';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import dayjs from 'dayjs';
import { Model } from 'mongoose';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

// 扩展 Day.js 插件
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(quarterOfYear)

@Injectable()
export class financialPlanTaskService {
  private readonly appTimezone = 'Asia/Shanghai' // 根据实际情况设置时区
  constructor(
    @InjectModel('FinancialPlan') private financialPlanModel: Model<FinancialPlanDocument>,
    @Inject()
    private readonly logger: loggingStatic,

  ) { }
  //测试定时任务
  // @Cron('* * * * * *')
  async handleCron() {
    // private readonly logger = new LoggingService(TasksService.name);
    // console.log('定时任务执行');
    // this.logger.log('每秒定时任务执行')
    // console.log(await this.financialPlanModel.find().lean());
  }

  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  @Cron('* * * * * *')
  async handleCronTask() {
    //下面定时任务deepseek生成的代码
    const now = dayjs().tz(this.appTimezone);
    // 分页处理大数据量
    const PAGE_SIZE = 100;
    let page = 0;
    while (true) {
      const latestTransactions = await this.financialPlanModel.aggregate([
        { $sort: { planDate: -1 } },
        {
          $group: {
            _id: "$planName",
            doc: { $first: "$$ROOT" }// $first 运算符，从每组文档中获取排序后（$sort 阶段）的第一个文档
          }
        },
        { $replaceRoot: { newRoot: "$doc" } },//$replaceRoot 用于用一个子文档替换文档的根文档。newRoot: "$doc" 表示将之前 $group 阶段中保存的 doc 字段替换为新的根文档。目的是去掉 _id 和分组结构，只保留原始的文档结构。
        { $skip: page * PAGE_SIZE },
        { $limit: PAGE_SIZE }
      ]).exec();

      if (latestTransactions.length === 0) break;
      // console.log(latestTransactions);
      
      await Promise.all(
        latestTransactions.map(transaction => this.processTransaction(transaction, now))
      );

      page++;
    }
  }


  private async processTransaction(transaction, now: dayjs.Dayjs) {
    const planDate = dayjs(transaction.planDate)
      .tz(this.appTimezone)
      .startOf('day');

    // 判断当前时间是否超过生效日期（包含相等情况）
    if (now.isSameOrAfter(planDate)) {
      const nextDate = this.calculateNextDate(
        planDate,
        transaction.period 
      );

      // 创建新交易记录
      const newTransaction = new this.financialPlanModel({
        ...transaction,
        _id: undefined,
        planDate: nextDate.toDate(),
        createdAt: new Date(),
        previousId: transaction._id
      });

      await newTransaction.save();

      // 更新原记录结束时间
      // await this.financialPlanModel.updateOne(
      //   { _id: transaction._id },
      //   { $set: { endDate: planDate.endOf('day').toDate() } }
      // );
    }
  }

  private calculateNextDate(baseDate: dayjs.Dayjs, period: string): dayjs.Dayjs {
    const baseDay = baseDate.date();
    const nextBase = baseDate.add(1, period as dayjs.ManipulateType);

    // 处理跨月天数不一致的情况
    if (period === 'month') {
      const originalLastDay = baseDate.endOf('month').date();
      const newLastDay = nextBase.endOf('month').date();

      // 如果原日期是当月最后一天
      if (baseDay === originalLastDay) {
        return nextBase.endOf('month').startOf('day');
      }
      // 处理类似1月30日+1month到2月的情况
      return nextBase.date(Math.min(baseDay, newLastDay));
    }
    if (period === 'quarter') {
      const originalLastDay = baseDate.endOf('quarter').date();
      const newLastDay = nextBase.endOf('quarter').date();

      // 如果原日期是当月最后一天
      if (baseDay === originalLastDay) {
        return nextBase.endOf('month').startOf('day');
      }
      // 处理类似1月30日+1month到2月的情况
      return nextBase.date(Math.min(baseDay, newLastDay));
    }

    return nextBase.startOf('day');
  }

}


