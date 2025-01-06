import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialplanDto } from './create-financialplan.dto';

export class UpdateFinancialplanDto extends PartialType(CreateFinancialplanDto) {}
