/*
 * @Author: HHG
 * @Date: 2024-08-22 16:32:49
 * @LastEditTime: 2024-12-21 12:53:28
 * @LastEditors: 韩宏广
 * @FilePath: /financial-serve/src/modules/modules.ts
 * @文件说明:
 */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BillModule } from './bill/bill.module';
import { ConsumptiontypeModule } from './consumptiontype/consumptiontype.module';
import { IncometypeModule } from './incometype/incometype.module';
import { InvestmentModule } from './investment/investment.module';
import { LiabilitiesModule } from './liabilities/liabilities.module';
import { FinancialplanModule } from './financialplan/financialplan.module';
import { TimedTaskModule } from '@/common/timed-task/timed-task.module';

@Module({
  imports: [UserModule, BillModule, ConsumptiontypeModule, IncometypeModule, InvestmentModule, LiabilitiesModule, FinancialplanModule,TimedTaskModule],
  // 注意：通常不需要在这里导出（exports）这些模块，
  // 除非封装模块的使用者需要访问这些模块的提供者（providers）或控制器（controllers）
  // exports: [ArticleModule, UserModule, AuthModule], // 根据需要取消注释
})
export class Modules { }
