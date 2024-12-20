import { IsString, IsNotEmpty, IsDateString, ValidateNested, IsDate, IsNumber, isNumber, Allow, IsEmpty, isDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvestmentDto {
  @IsNotEmpty({ message: '存款名称不能为空' })
  depositName: string;

  @IsNotEmpty({ message: '本金不能为空' })
  @IsNumber({},{message:"本金请输入数字"})
  amountDeposited: number;

  @IsNotEmpty({ message: '利率不能为空' })
  @IsNumber({}, { message: '利率请输入数字' })
  interestRate: number;

  @IsNotEmpty({ message: '到期时间不能为空' })
  @IsDateString()
  expirationTime: Date;

  @IsString()
  remark: string;

  // @IsDateString({},{message:"请输入正确时间格式"})
  // createdAt: Date;
}

export class QueryDepositDto {
  // @IsNotEmpty({ message: '存款名称不能为空' })

  depositName: string | null;

  // @IsEmpty()
  expirationTime: Date | null;
}

export class EditDepositInfoDto {
  actiontype: string;

  @IsDateString()
  expirationTime: string; //到期时间

  amountDeposited: number; //续存本金 存款金额=续存本金+本金
  interestRate: number; //利率  0、1都需要传
  gowhere: string; //去向
  interest: number; //利息
}
