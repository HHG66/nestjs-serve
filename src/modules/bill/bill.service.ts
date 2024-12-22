import { HttpException, Injectable } from '@nestjs/common';
import { CreateBillDto, CreateBillListDto } from './dto/create-bill.dto';
// import { UpdateBillDto } from './dto/update-bill.dto';
import { BillDocument } from '@/model/Bill.entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Inject } from '@nestjs/common';
import { log } from 'console';
import { ResponseDto } from '@/utils/response';
import { LoggingService } from '@/global/logger/logging.service';
import { QueryBillDto } from './dto/query-bill.dto';
// import { CustomWinstonLogger } from '@/utils/customWinstonLogger';
// import moment from 'moment';
import dayjs from 'dayjs';

@Injectable()
export class BillService {
  constructor(
    // private readonly logger: CustomWinstonLogger,
    @InjectModel('Bill')
    private billModel: Model<BillDocument>,
    // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    // @Inject(WINSTON_MODULE_PROVIDER)
    @Inject()
    private readonly logger: LoggingService // 注入 LoggingService
  ) { }
  async uploadBill(data: CreateBillListDto) {
    // console.log(typeof data);
    // console.log(data);
    // 使用 rawData 创建 CreateBillDto 实例并放入数组中
    let bills: CreateBillDto[] = []
    try {
      bills = data.map((data) => {
        const bill = new CreateBillDto();
        bill.tradinghours = new Date(data.tradinghours);
        bill.tradetype = data.tradetype;
        bill.counterparty = data.counterparty;
        bill.product = data.product;
        bill.collectorbranch = data.collectorbranch;
        bill.amount = parseFloat(data.amount.replace('¥', ''));
        bill.patternpayment = data.patternpayment;
        bill.currentstate = data.currentstate;
        bill.trasactionid = data.trasactionid;
        bill.merchantstoorder = data.merchantstoorder;
        bill.remark = data.remark;
        bill.updataDate = data.updataDate;
        // bill.createdAt = new Date();
        return bill;
      });
    } catch (error) {
      return ResponseDto.failureWithAutoTip('请导入正确格式的帐单')
    }

    try {
      //ordered true遇到错误立即报错，false 跳过当条处理完毕后报错
      const createResult = await this.billModel.insertMany(bills, {
        ordered: false,
      });
      if (createResult.length >= 0) {
        // this.logger.log(`账单成功导入${createResult.length}条`);
        return ResponseDto.success({}, undefined, `上传成功共导入${createResult.length}`);
      }
    } catch (error) {
      // console.log(error);
      // console.log(error.writeErrors.length);
      // console.log(error.results.length);
      this.logger.log(
        // `共计${error.results.length}条账单的交易id重复,导入成功${bills.length - error.results.length}条`
        `共计${bills.length}条账单，成功导入${error.insertedDocs.length}条，重复数据${error.writeErrors.length}条`
      );
      return ResponseDto.successWithAutoTip({}, `共计${bills.length}条账单，成功导入${error.insertedDocs.length}条，重复数据${error.writeErrors.length}条`);
    }
  }
  async getdisposebill(query: QueryBillDto) {
    let startOfDay = dayjs(query.importTime);
    let endOfDay = dayjs(query.importTime).add(1, 'M');
    console.log(startOfDay, endOfDay);
    let queryData = {};
    if (query.importTime !== undefined) {
      queryData = {
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      };
    }
    let result = await this.billModel
      .find(queryData)
      .skip((query.page - 1) * query.pageSize)
      .limit(query.pageSize)
      .lean();
    // let billTotal = await this.billModel.countDocuments();
    let billTotal = (await this.billModel.find(queryData).lean()).length;
    let newResult = result.map((element) => {
      return {
        ...element,
        createdAt: dayjs(element.createdAt).format('YYYY-MM-DD hh:mm:ss'),
        tradinghours: dayjs(element.tradinghours).format('YYYY-MM-DD hh:mm:ss'),
      };
    });
    // console.log(newResult.length);
    return ResponseDto.success(newResult, {
      page: query.page,
      pageSize: query.pageSize,
      total: billTotal,
    });
  }

  async getPeriodTimebill(query) {
    let billList = [];
    let result = await this.billModel
      .find({
        tradinghours: {
          $lte: new Date(query.endDate),
          $gte: new Date(query.startDate),
        },
      })
      .lean();
    result.map((element) => {
      billList.push({
        ...element,
        tradinghours: dayjs(element.tradinghours).format('YYYY-MM-DD H:mm:ss'),
      });
    });
    return ResponseDto.success(billList);
  }

  async getBalancePayments(date) {
    console.log(dayjs(date).format('YYYY-MM-DD'));
    console.log(new Date(dayjs(date).format('YYYY-MM-DD H:mm:ss')));
    console.log(new Date(dayjs(date).add(1, 'day').format('YYYY-MM-DD H:mm:ss')));
    let dailyStatementList = [];

    let result = await this.billModel
      .find({
        tradinghours: {
          $gte: new Date(dayjs(date).format('YYYY-MM-DD H:mm:ss')),
          $lte: new Date(dayjs(date).add(1, 'day').format('YYYY-MM-DD H:mm:ss')),
        },
      })
      .lean();
    result.map((element) => {
      dailyStatementList.push({
        ...element,
        tradinghours: dayjs(element.tradinghours).format('YYYY-MM-DD H:mm:ss'),
      });
    });

    return ResponseDto.success(dailyStatementList);
  }
}
