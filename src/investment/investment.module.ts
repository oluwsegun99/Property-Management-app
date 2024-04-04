import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentResolver } from './investment.resolver';

@Module({
  providers: [InvestmentService, InvestmentResolver]
})
export class InvestmentModule {}
