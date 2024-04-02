import { Module } from '@nestjs/common';
import { InspectionService } from './inspection.service';
import { InspectionResolver } from './inspection.resolver';

@Module({
  providers: [InspectionService, InspectionResolver]
})
export class InspectionModule {}
