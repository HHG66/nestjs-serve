import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestmentDto } from './create-investment.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateInvestmentDto extends PartialType(CreateInvestmentDto) {

  @IsNotEmpty({ message: '请选择需要修改的数据' })
  _id: string;
}
