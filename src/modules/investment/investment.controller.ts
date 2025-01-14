import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { CreateInvestmentDto, EditDepositInfoDto, QueryDepositDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { CreatedDepositRecordDto } from './dto/dto';

@Controller('investment')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Post('createdDeposit')
  create(@Body() createInvestmentDto: CreateInvestmentDto) {
    return this.investmentService.createDepositRecord(createInvestmentDto);
  }

  @Get('getDepositList')
  getDepositList(@Query() query:QueryDepositDto) {
    return this.investmentService.getDepositList(query);
  }

  @Post('editDepositInfo')
  editDepositInfo(@Body() editDepositInfoDto: EditDepositInfoDto) {
    return this.investmentService.editDepositInfo(editDepositInfoDto);
  }

  @Post('updateDepositsInfo')
  updateDepositsInfo(@Body() editDepositInfoDto: UpdateInvestmentDto) {
    return this.investmentService.updateDepositsInfo(editDepositInfoDto);
  }
  
  @Post('deletedepositinfo')
  deletedepositinfo(@Body('_id') id: string) {
    return this.investmentService.deletedepositinfo(id);
  }

  @Get('depositSummary')
  depositSummary() {
    return this.investmentService.depositSummary();
  }
  
  @Post('createdDepositRecord')
  createdDepositRecordApi(@Body() createdDepositRecordDto: CreatedDepositRecordDto) {
    return this.investmentService.createdDepositRecordApi(createdDepositRecordDto);
  }

  @Get('getDepositRecordsList')
  getDepositRecordsList(@Query('_id') _id:string) {
    return this.investmentService.getDepositRecordsList(_id);
  }
  
  
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.investmentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInvestmentDto: UpdateInvestmentDto) {
  //   return this.investmentService.update(+id, updateInvestmentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.investmentService.remove(+id);
  // }
}
