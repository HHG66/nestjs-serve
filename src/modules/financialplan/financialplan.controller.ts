import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FinancialplanService } from './financialplan.service';
import { CreateFinancialplanDto } from './dto/create-financialplan.dto';
import { UpdateFinancialplanDto } from './dto/update-financialplan.dto';
import { QueryFinancialplanDto } from './dto/query-financialplan.dto';

@Controller('financialPlan')
export class FinancialplanController {
  constructor(private readonly financialplanService: FinancialplanService) { }

  @Post('createdPlan')
  create(@Body() createFinancialplanDto: CreateFinancialplanDto) {
    return this.financialplanService.create(createFinancialplanDto);
  }

  @Get('getPlan')
  getPlan(@Query() queryFinancialplanDto: QueryFinancialplanDto) {
    return this.financialplanService.getPlan(queryFinancialplanDto);
  }

  @Post('updataPlan')
  updataPlan(@Body() updateFinancialplanDto: UpdateFinancialplanDto) {
    return this.financialplanService.updataPlan(updateFinancialplanDto);
  }

  @Post('deletePlan')
  remove(@Body('_id') id: string) {
    return this.financialplanService.remove(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.financialplanService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFinancialplanDto: UpdateFinancialplanDto) {
  //   return this.financialplanService.update(+id, updateFinancialplanDto);
  // }


}
