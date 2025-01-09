import { PartialType } from '@nestjs/mapped-types';
import { CreateTimedTaskDto } from './create-timed-task.dto';

export class UpdateTimedTaskDto extends PartialType(CreateTimedTaskDto) {}
