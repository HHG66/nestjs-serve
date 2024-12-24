import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LiabilitiesService } from './liabilities.service';
import { CreateLiabilityDto } from './dto/create-liability.dto';
import { UpdateLiabilityInfoDto } from './dto/update-liability.dto';
import { CreateRepaymentScheduleDto } from './dto/create-repayment-schedule.dto'
@Controller('liabilities')
export class LiabilitiesController {
  constructor(private readonly liabilitiesService: LiabilitiesService) { }

  @Post('createdLoanRecord')
  create(@Body() createLiabilityDto: CreateLiabilityDto) {
    return this.liabilitiesService.create(createLiabilityDto);
  }

  @Get('getLoanList')
  getLoanList() {
    return this.liabilitiesService.getLoanList();
  }


  @Post('deleteLoan')
  deleteLoan(@Body('loanid') id: string) {
    return this.liabilitiesService.deleteLoan(id);
  }

  @Post('editloaninfo')
  editloaninfo(@Body() UpdateLiabilityDto: UpdateLiabilityInfoDto) {
    return this.liabilitiesService.editloaninfo(UpdateLiabilityDto);
  }

  //贷款基础信息
  @Get('getLoanInfo')
  getLoanInfo(@Query('_id') id: string) {
    return this.liabilitiesService.getLoanInfo(id);
  }

  //还款计划列表
  @Get('getLoanInfoList')
  getLoanInfoList(@Query('_id') id: string) {
    return this.liabilitiesService.getLoanInfoList(id);
  }

  @Post('updateLoanInfolist')
  updateLoanInfolist(@Body() CreateRepaymentScheduleDto: CreateRepaymentScheduleDto) {
    return this.liabilitiesService.updateLoanInfolist(CreateRepaymentScheduleDto);
  }

}
