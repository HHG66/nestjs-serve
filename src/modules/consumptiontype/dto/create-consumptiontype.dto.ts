import { IsString, IsNotEmpty } from 'class-validator';
export class CreateConsumptiontypeDto {
  @IsNotEmpty({message:"消费类型名称不允许为空"})
  consumptionTypeName: string;

  productKeyWords: string[];

  remark: string;
}

export class CreateConsumptiontypeModelDto {
  @IsNotEmpty({message:"消费类型名称不允许为空"})
  consumptionTypeName: string;

  productKeyWords: string[];

  remark: string;
}

