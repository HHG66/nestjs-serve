
import { IsString, IsNotEmpty, IsDateString, ValidateNested, IsDate, IsNumber, isNumber, Allow, IsEmpty, isDateString, isString, IsPositive, Min, Max } from 'class-validator';
export class CreateLiabilityDto {
  @IsNotEmpty({ message: '余额不能为空' })
  @IsNumber() 
  @IsPositive({ message: '余额必须为正数' })
  balance: number; // 或者 number 类型
 
  @IsNotEmpty({ message: '利息不能为空' })
  @IsNumber() 
  @IsPositive({ message: '利息必须为正数' })
  interest: string; // 或者 number 类型
 
  @IsNotEmpty({ message: '利率不能为空' })
  @IsNumber() // 利率可能是小数，但这里假设以字符串形式存储
  @Min(0, { message: '利率必须为非负数' })
  @Max(100, { message: '利率不能超过100%' })
  interestRate: string; // 或者 number 类型，注意处理小数
 
  @IsNotEmpty({ message: '负债名称不能为空' })
  @IsString()
  liabilitiesName: string;
 
  @IsNotEmpty({ message: '还款模式不能为空' })
  @IsString()
  modeRepayment: string;
 
  @IsString()
  remark: string;
}
