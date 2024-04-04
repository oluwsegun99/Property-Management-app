import { Module } from '@nestjs/common';
import { MortgageService } from './mortgage.service';
import { MortgageResolver } from './mortgage.resolver';

@Module({
  providers: [MortgageService, MortgageResolver]
})
export class MortgageModule {}
