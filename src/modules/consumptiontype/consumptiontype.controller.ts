import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ConsumptiontypeService } from './consumptiontype.service';
import { CreateConsumptiontypeDto } from './dto/create-consumptiontype.dto';
import { UpdateConsumptiontypeDto } from './dto/update-consumptiontype.dto';

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

}
