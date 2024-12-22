import { Module } from '@nestjs/common';
import { LiabilitiesService } from './liabilities.service';
import { LiabilitiesController } from './liabilities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LiabilitiesSchema } from '@/model/Liabilities.entities';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Liabilities', schema: LiabilitiesSchema }])],
  controllers: [LiabilitiesController],
  providers: [LiabilitiesService],
})
export class LiabilitiesModule {}
