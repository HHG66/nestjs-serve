

import { IsString, IsNotEmpty, IsDateString, ValidateNested, IsDate, IsNumber, isNumber, Allow, IsEmpty, isDateString, ValidatorConstraint, ValidationArguments, ValidatorConstraintInterface, registerDecorator, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { IsDateStringOrEmptyConstraint, IsNumberOrNullOrUndefinedConstraint } from '@/utils/validate';
// 自定义验证器

 
export class CreatedDepositRecordDto {
  @IsNotEmpty({ message: '请选择需要修改的数据' })
  _id:string

  @IsDateString({},{message:'请输入存款日期'})
  depositDate: string;
 

  @IsNumber({},{message:'请输入数字'})
  depositRecordAmount: number;

  @IsString()
  remark: string;

}

