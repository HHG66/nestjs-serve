import { IsString, IsNotEmpty } from 'class-validator';

export class QueryBillDto {
  // @IsNotEmpty({message:"导入时间不能为空"})
  // @IsString()
  importTime:string

  page:number

  pageSize:number

}
  