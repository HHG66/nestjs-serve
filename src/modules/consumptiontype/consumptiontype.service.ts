import { Inject, Injectable } from '@nestjs/common';
import { CreateConsumptiontypeDto, CreateConsumptiontypeModelDto } from './dto/create-consumptiontype.dto';
import { UpdateConsumptiontypeDto } from './dto/update-consumptiontype.dto';
import { ConsumptionTypeDocument } from '@/entities/consumptionType.entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseDto } from '@/utils/response';
import { LoggingService } from '@/global/logger/logging.service';
import moment from 'moment';

@Injectable()
export class ConsumptiontypeService {
  constructor(
    @InjectModel('consumptionType')
    private consumptionTypeModel: Model<ConsumptionTypeDocument>,
    @Inject()
    private readonly logger: LoggingService // 注入 LoggingService
  ) {}

  async create(createConsumptiontypeDto: CreateConsumptiontypeDto) {
    try {
      console.log(createConsumptiontypeDto);
      let inserData :CreateConsumptiontypeModelDto  
      inserData={
        consumptionTypenName: createConsumptiontypeDto.consumptionTypenName,
        productKeyWords: [createConsumptiontypeDto.productKeyWords],
        remark: createConsumptiontypeDto.remark
      }
      let reesult = await this.consumptionTypeModel.create(
        inserData
      );
      // console.log(reesult);
      if (reesult) {
        return  ResponseDto.successWithAutoTip({}, '新增成功');
      }
    } catch (error) {
      // console.log('error', error);
      this.logger.error(error);
      return   ResponseDto.failureWithAutoTip(`插入失败已经存在消费类型`);
    }
  }

 async getConsumptionTypeList(consumptionTypeName:string) {
    let queryData: { [key: string]: any } = {};
    if(consumptionTypeName){
      queryData.consumptionTypeName=consumptionTypeName
    }
    //类型定义让人痛苦！
    let result= (await this.consumptionTypeModel.find(queryData).lean())as any
    result.createdAt=moment(result.createdAt).format("YYYY-MM-DD")
    return  ResponseDto.success(result)
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} consumptiontype`;
  // }

  // update(id: number, updateConsumptiontypeDto: UpdateConsumptiontypeDto) {
  //   return `This action updates a #${id} consumptiontype`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} consumptiontype`;
  // }
}
