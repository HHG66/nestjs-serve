import { Inject, Injectable } from '@nestjs/common';
import { CreateConsumptiontypeDto, CreateConsumptiontypeModelDto } from './dto/create-consumptiontype.dto';
import { UpdateConsumptionTypeDto } from './dto/update-consumptiontype.dto';
import { ConsumptionTypeDocument } from '@/model/consumptionType.entities';
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
      // console.log(createConsumptiontypeDto);
      let inserData: CreateConsumptiontypeModelDto;
      inserData = {
        consumptionTypeName: createConsumptiontypeDto.consumptionTypeName,
        productKeyWords: createConsumptiontypeDto.productKeyWords,
        remark: createConsumptiontypeDto.remark,
      };
      let reesult = await this.consumptionTypeModel.create(inserData);
      // console.log(reesult);
      if (reesult) {
        return ResponseDto.success({}, undefined, '新增成功');
      }
    } catch (error) {
      // console.log('error', error);
      this.logger.error(error);
      if (error.code == '11000') {
        if (error.errorResponse.keyValue.consumptionTypeName !== undefined) {
          return ResponseDto.failureWithAutoTip(`已经存在消费类型`);
        }
      }
      return ResponseDto.failureWithAutoTip(`新增失败`);
    }
  }

  async getConsumptionTypeList(consumptionTypeName: string) {
    let queryData: { [key: string]: any } = {};
    if (consumptionTypeName) {
      queryData.consumptionTypeName = consumptionTypeName;
    }
    //类型定义让人痛苦！
    // consumptionTypeName;
    let result = (await this.consumptionTypeModel.find(queryData).lean()) as any;
    result.createdAt = moment(result.createdAt).format('YYYY-MM-DD');
    return ResponseDto.success(result);
  }
  async deleteConsumptionType(_id: string) {
    let reesult = await this.consumptionTypeModel
      .deleteOne({
        _id: _id,
      })
      .lean();
    if (reesult.deletedCount == 1) {
      return ResponseDto.successWithAutoTip(undefined, '删除成功');
    } else {
      return ResponseDto.failureWithAutoTip('删除失败');
    }
  }
  async updateConsumptionType(updateConsumptiontype: UpdateConsumptionTypeDto) {
    // let productKeyWordsList = [];
    // productKeyWordsList = updateConsumptiontype.productKeyWords;
    let updataInfo = {
      consumptionTypeName: updateConsumptiontype.consumptionTypeName,
      productKeyWords: updateConsumptiontype.productKeyWords,
      remark: updateConsumptiontype.remark,
    };
    // updateConsumptiontypeDto.productKeyWords.length > 0 ? (updataProductKeyWordsList = consumptionType.productKeyWords) : '';
    // consumptionType.productKeyWords.length > 0 &&
    //   consumptionType.productKeyWords.map((element: any) => {
    //     //两个数组，除了双循环判断，是否还有其他优化办法和思路，带解决
    //     updateConsumptiontypeDto.productKeyWords.map((obj: any) => {
    //       if (obj.value !== element.value) {
    //         // updataProductKeyWordsList.push(obj);
    //         test.push(obj)
    //       }
    //     });
    //     // updataProductKeyWordsList.push(
    //     //   element,
    //     //   ...updateConsumptiontypeDto.productKeyWords
    //     // );
    //     // updataProductKeyWordsList.push({
    //     //   label: element.label,
    //     //   value: element.value,
    //     //   color: element.color,
    //     // });
    //   });
    //   console.log(test);

    // consumptionType.productKeyWords.length == 0 ? (updataProductKeyWordsList = updateConsumptiontypeDto.productKeyWords) : '';
    // console.log(updataProductKeyWordsList);
    console.log(updataInfo);

    try {
      let result = await this.consumptionTypeModel
        .updateOne(
          {
            _id: updateConsumptiontype._id,
          },
          updataInfo
          // $set: { productKeyWords: updataProductKeyWordsList }
        )
        .exec();
      if (result.modifiedCount > 0) {
        return ResponseDto.successWithAutoTip({}, '修改成功');
      }
      if (result.matchedCount > 0 && updateConsumptiontype.productKeyWords.length > 0) {
        return ResponseDto.successWithAutoTip({}, '修改成功');
      }
      if (result.matchedCount == 0) {
        return ResponseDto.failureWithAutoTip('未找到数据');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} consumptiontype`;
  // }

  // update(id: number, updateConsumptiontypeDto: UpdateConsumptionTypeDto) {
  //   return `This action updates a #${id} consumptiontype`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} consumptiontype`;
  // }
}
