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
import { LoggingService } from '@/global/logger/logging.service';
// import { CustomWinstonLogger } from '@/utils/customWinstonLogger';
@Injectable()
export class BillService {
  constructor(
    // private readonly logger: CustomWinstonLogger,
    @InjectModel('Bill')
    private billModel: Model<BillDocument>,
    // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    // @Inject(WINSTON_MODULE_PROVIDER) 
    @Inject()
    private readonly logger: LoggingService,  // 注入 LoggingService

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
    try {
      //ordered true遇到错误立即报错，false 跳过当条处理完毕后报错
      const createResult = await this.billModel.insertMany(bills, {
        ordered: false,
      });
      if (createResult.length > 0) {
        // this.logger.log(`账单成功导入${createResult.length}条`);
        return ResponseDto.success({}, undefined, '上传成功');
      }
    } catch (error) {
      this.logger.log(
        // `共计${error.results.length}条账单的交易id重复,导入成功${bills.length - error.results.length}条`
         `共计${bills.length}条账单，成功导入${bills.length - error.results.length}条，重复数据${error.results.length}条`
      );
      return ResponseDto.success(
        {},
        undefined,
        `共计${bills.length}条账单，成功导入${bills.length - error.results.length}条，重复数据${error.results.length}条`
      );
    }
  }
}
