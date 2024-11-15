import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBillDto {
  // @IsNotEmpty({message:"用户名不能为空"})
  // @IsString()
  // username:string
  // @IsNotEmpty({message:"密码不能为空"})
  // @IsString()
  // password:string
  tradinghours: string;
  tradetype: string;
  counterparty: string;
  product: string;
  collectorbranch: string;
  amount: string;
  patternpayment: string;
  currentstate: string;
  trasactionid: string;
  merchantstoorder: string;
  remark: string;
  updataDate: Date;
}
