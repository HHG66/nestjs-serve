import {
  IsString,
  IsNotEmpty,
  IsDateString,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AliPayBillDto {
  @IsNotEmpty({ message: '交易创建时间不能为空' })
  @IsString()
  transactionCreationTime: Date;


  @IsNotEmpty({ message: '最近修改时间不能为空' })
  @IsString()
  lastModifiedTime: Date;

  @IsNotEmpty({ message: '交易来源地不能为空' })
  @IsString()
  sourceTransaction: string;

  @IsNotEmpty({ message: '类型不能为空' })
  @IsString()
  payPattern: string;

  @IsNotEmpty({ message: '交易状态不能为空' })
  @IsString()
  tradingStatus: string;

  @IsNotEmpty({ message: '服务费（元）不能为空' })
  @IsString()
  serviceCharge: string;

  @IsNotEmpty({ message: '成功退款（元）不能为空' })
  @IsString()
  successfulRefund: string;

  @IsNotEmpty({ message: '资金状态不能为空' })
  @IsString()
  fundStatus: string;
}

export class CreateBillDto extends AliPayBillDto {
  map(arg0: (data: any) => CreateBillDto): CreateBillDto[] {
    throw new Error('Method not implemented.');
  }
  @IsNotEmpty({ message: '交易时间不能为空' })
  @IsDate()
  tradinghours: Date;

  @IsNotEmpty({ message: '交易类型不能为空' })
  @IsString()
  tradetype: string;

  @IsNotEmpty({ message: '交易对方不能为空' })
  @IsString()
  counterparty: string;

  @IsNotEmpty({ message: '商品不能为空' })
  @IsString()
  product: string;

  @IsNotEmpty({ message: '收/支不能为空' })
  @IsString()
  collectorbranch: string;

  @IsNotEmpty({ message: '金额不能为空' })
  @IsString()
  amount: string|Number;

  @IsNotEmpty({ message: '支付方式不能为空' })
  @IsString()
  patternpayment: string;

  @IsNotEmpty({ message: '当前状态不能为空' })
  @IsString()
  currentstate: string;

  @IsNotEmpty({ message: '交易单号不能为空' })
  @IsString()
  trasactionid: string;

  @IsNotEmpty({ message: '商户单号不能为空' })
  @IsString()
  merchantstoorder: string;

  @IsNotEmpty({ message: '账单类型' })
  @IsString()
  billType: string;

  @IsString()
  remark: string;

  @IsDateString()
  updataDate: Date;

  createdAt:any
  
}


export class CreateBillListDto {
  //暂时取消校验
  // map(arg0: (data: any) => CreateBillDto): CreateBillDto[] {
  //   throw new Error('Method not implemented.');
  // }
  // @Type(() => CreateBillDto)
  // @ValidateNested({ each: true })
  datas: CreateBillDto[];

  @IsString()
  billType: string;
}
