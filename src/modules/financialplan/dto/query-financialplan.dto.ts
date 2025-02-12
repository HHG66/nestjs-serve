/*
 * @Author: HHG
 * @Date: 2025-01-06 17:43:54
 * @LastEditTime: 2025-02-12 11:35:55
 * @LastEditors: 韩宏广
 * @FilePath: \financial-serve\src\modules\financialplan\dto\query-financialplan.dto.ts
 * @文件说明: 
 */
import { IsDateString, IsNotEmpty } from "class-validator";
import { Dayjs } from "dayjs";



export class QueryFinancialplanDto {

  period: string
  planDate: Date
}
