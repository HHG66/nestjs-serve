import { IsString, IsNotEmpty } from 'class-validator';

export class QueryBillDto {
  // @IsNotEmpty({message:"导入时间不能为空"})
  // @IsString()
  importTime:string

  page:number

  pageSize:number

}
  

export class QueryDateRangeDto {
  // @IsNotEmpty({message:"日期范围不能为空"})
  @IsString()
  startDate:string

  @IsString()
  endDate:string
  
}

export class QueryDateDto {
  // @IsNotEmpty({message:"日期范围不能为空"})
  @IsString({
    message:'日期格式错误'
  })
  date:string

}

