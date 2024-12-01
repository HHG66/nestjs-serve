import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto, CreateBillListDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { QueryBillDto } from './dto/query-bill.dto';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post('importingbills')
  create(@Body() createBillDto: CreateBillListDto) {
    return this.billService.uploadBill(createBillDto);
  }
 @Get('getdisposebill')
 getdisposebill(@Query() query: QueryBillDto) {
    // console.log(query)
    return this.billService.getdisposebill(query);
  }
  // @Post('')
  // create(@Body() createBillDto: CreateBillDto) {
  //   return this.billService.create(createBillDto);
  // }

  // @Get()
  // findAll() {
  //   return this.billService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.billService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
  //   return this.billService.update(+id, updateBillDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.billService.remove(+id);
  // }
}
