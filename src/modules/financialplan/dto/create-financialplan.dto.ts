import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateFinancialplanDto {
  @IsNotEmpty({ message: "计划名称不允许为空" })
  planName: string

   @IsDateString({},{message:'请输入还款日期'})
  planDate: string

  period: string
}


