import { IsNotEmpty } from 'class-validator';

export class CreateIncometypeDto {
  @IsNotEmpty({ message: '收入类型名称不允许为空' })
  incomeName: string;

  incomeKeyWords: string[];

  remark: string;
}
