import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumptiontypeDto } from './create-consumptiontype.dto';

export class UpdateConsumptiontypeDto extends PartialType(CreateConsumptiontypeDto) {}
