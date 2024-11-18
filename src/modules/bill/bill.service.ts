import { HttpException, Injectable } from '@nestjs/common';
import { CreateBillDto, CreateBillListDto } from './dto/create-bill.dto';
// import { UpdateBillDto } from './dto/update-bill.dto';
import { BillDocument } from '@/entities/Bill.entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Inject } from '@nestjs/common';
import { log } from 'console';
import { ResponseDto } from '@/utils/response';
@Injectable()
export class BillService {
  constructor(
    @InjectModel('Bill')
    private billModel: Model<BillDocument>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}
  async uploadBill(data: CreateBillListDto) {
    // console.log(typeof data);
    // console.log(data);
    // 使用 rawData 创建 CreateBillDto 实例并放入数组中
    const bills: CreateBillDto[] = data.map((data) => {
      const bill = new CreateBillDto();
      bill.tradinghours = data.tradinghours;
      bill.tradetype = data.tradetype;
      bill.counterparty = data.counterparty;
      bill.product = data.product;
      bill.collectorbranch = data.collectorbranch;
      bill.amount = data.amount;
      bill.patternpayment = data.patternpayment;
      bill.currentstate = data.currentstate;
      bill.trasactionid = data.trasactionid;
      bill.merchantstoorder = data.merchantstoorder;
      bill.remark = data.remark;
      bill.updataDate = data.updataDate;
      return bill;
    });
    console.log(bills.length);
    try {
      const createResult = await this.billModel.create(bills);
      console.log(createResult);

      if (createResult.length > 0) {
        console.log('___+');
        return ResponseDto.success({}, undefined, '上传成功');
        // return new ResponseDto(200, '0', '', {});
      }
    } catch (error) {
      this.logger.error(error);
      return {
     
      };
    }
    // console.log(createResult);

    return '';
  }
}
