import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncometypeService } from './incometype.service';
import { CreateIncometypeDto } from './dto/create-incometype.dto';
import { UpdateIncometypeDto } from './dto/update-incometype.dto';

@Controller('incometype')
export class IncometypeController {
  constructor(private readonly incometypeService: IncometypeService) {}

  @Post('addIncomeType')
  create(@Body() createIncometypeDto: CreateIncometypeDto) {
    return this.incometypeService.create(createIncometypeDto);
  }

  @Post('deleteIncomeType')
  deleteIncomeType(@Body('_id') _id: string) {
    return this.incometypeService.deleteIncomeType(_id);
  }

  @Get('getIncomeTypeList')
  getIncomeTypeList() {
    return this.incometypeService.getIncomeTypeList();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.incometypeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateIncometypeDto: UpdateIncometypeDto) {
  //   return this.incometypeService.update(+id, updateIncometypeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.incometypeService.remove(+id);
  // }
}
