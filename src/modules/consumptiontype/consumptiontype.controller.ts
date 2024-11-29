import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ConsumptiontypeService } from './consumptiontype.service';
import { CreateConsumptiontypeDto } from './dto/create-consumptiontype.dto';
import { UpdateConsumptionTypeDto } from './dto/update-consumptiontype.dto';

@Controller('consumptionType')
export class ConsumptiontypeController {
  constructor(private readonly consumptiontypeService: ConsumptiontypeService) {}

  @Post("addConsumptionType")
  create(@Body() createConsumptiontypeDto: CreateConsumptiontypeDto) {
    return this.consumptiontypeService.create(createConsumptiontypeDto);
  }

  @Get('getConsumptionTypeList')
  getConsumptionTypeList(@Query("consumptionTypeName") consumptionTypeName:string) {
    return this.consumptiontypeService.getConsumptionTypeList(consumptionTypeName);
  }

  @Post('deleteConsumptionType')
  deleteConsumptionType(@Body() _id:string) {
    return this.consumptiontypeService.deleteConsumptionType(_id);
  }

  @Post('updateConsumptionType')
  updateConsumptionType(@Body() updateConsumptionType:UpdateConsumptionTypeDto) {
    return this.consumptiontypeService.updateConsumptionType(updateConsumptionType);
  }

  

}
