import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumptiontypeDto } from './create-consumptiontype.dto';
import { IsString, IsNotEmpty } from 'class-validator';
export class UpdateConsumptionTypeDto {
  @IsNotEmpty({ message: '请选择需要删除的数据' })
  _id: string;

  @IsNotEmpty({ message: '消费类型名称不允许为空' })
  consumptionTypeName: string;

  productKeyWords: string[];

  remark: string;
}
