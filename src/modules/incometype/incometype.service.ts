import { Inject, Injectable } from '@nestjs/common';
import { CreateIncometypeDto } from './dto/create-incometype.dto';
import { UpdateIncometypeDto } from './dto/update-incometype.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LoggingService } from '@/global/logger/logging.service';
import { Model } from 'mongoose';
import { IncomeTypeDocument } from '@/model/IncomeType.entities';
import { ResponseDto } from '@/utils/response';
@Injectable()
export class IncometypeService {
  constructor(
    @InjectModel('incomeType')
    private incomeTypeModel: Model<IncomeTypeDocument>,
    @Inject()
    private readonly logger: LoggingService // 注入 LoggingService
  ) {}

  async create(createIncometypeDto: CreateIncometypeDto) {
    let existResult = await this.incomeTypeModel
      .findOne({
        incomeName: createIncometypeDto.incomeName,
      })
      .exec();
    console.log(existResult);
    if (existResult !== null) {
      return ResponseDto.failureWithAutoTip('存在收入类型名称');
    }
    let createdResule = await this.incomeTypeModel.create(createIncometypeDto);
    if (createdResule.incomeName) {
      return ResponseDto.successWithAutoTip(undefined, '新增成功');
    }
  }

  async deleteIncomeType(_id: string) {
    let result = await this.incomeTypeModel
      .deleteOne({
        _id,
      })
      .exec();
    if (result.deletedCount == 1) {
      return ResponseDto.successWithAutoTip(undefined, '删除成功');
    }
    if (result.deletedCount == 0) {
      return ResponseDto.failureWithAutoTip('未找到数据');
    }
    return ResponseDto.failureWithAutoTip('删除失败');
  }

  async getIncomeTypeList() {
    let result = await this.incomeTypeModel.find().exec();
    return ResponseDto.success(result);
  }

  // update(id: number, updateIncometypeDto: UpdateIncometypeDto) {
  //   return `This action updates a #${id} incometype`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} incometype`;
  // }
}
