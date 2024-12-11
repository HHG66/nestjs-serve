import { PartialType } from '@nestjs/mapped-types';
import { CreateIncometypeDto } from './create-incometype.dto';

export class UpdateIncometypeDto extends PartialType(CreateIncometypeDto) {}
