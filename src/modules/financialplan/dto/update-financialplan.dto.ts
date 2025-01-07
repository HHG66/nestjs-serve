import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialplanDto } from './create-financialplan.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateFinancialplanDto extends CreateFinancialplanDto {
  @IsNotEmpty({ message: "请选择数据" })
  _id: string
}
