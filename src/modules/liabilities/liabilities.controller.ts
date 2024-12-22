import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LiabilitiesService } from './liabilities.service';
import { CreateLiabilityDto } from './dto/create-liability.dto';
import { UpdateLiabilityInfoDto } from './dto/update-liability.dto';

@Controller('liabilities')
export class LiabilitiesController {
  constructor(private readonly liabilitiesService: LiabilitiesService) {}

  @Post('createdLoanRecord')
  create(@Body() createLiabilityDto: CreateLiabilityDto) {
    return this.liabilitiesService.create(createLiabilityDto);
  }

  @Get('getLoanList')
  getLoanList() {
    return this.liabilitiesService.getLoanList();
  }


  @Post('deleteLoan')
  deleteLoan(@Body('loanid') id:string) {
    return this.liabilitiesService.deleteLoan(id);
  }
  
  @Post('editloaninfo')
  editloaninfo(@Body() UpdateLiabilityDto:UpdateLiabilityInfoDto) {
    return this.liabilitiesService.editloaninfo(UpdateLiabilityDto);
  }
  
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.liabilitiesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLiabilityDto: UpdateLiabilityDto) {
  //   return this.liabilitiesService.update(+id, updateLiabilityDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.liabilitiesService.remove(+id);
  // }
}
