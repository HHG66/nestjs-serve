import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
// import { UpdateBillDto } from './dto/update-bill.dto';
import { BillDocument } from '@/entities/Bill.entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Inject } from '@nestjs/common';
@Injectable()
export class BillService {
  constructor(
    @InjectModel('Bill')
    private billModel: Model<BillDocument>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}
  async uploadBill(createBillDto: CreateBillDto) {
    console.log(typeof createBillDto);
    console.log(createBillDto);
    let mapper={
      "交易时间"
    }
    const createResult = await this.billModel.create(createBillDto);
    console.log(createResult);

    return '';
  }
}
