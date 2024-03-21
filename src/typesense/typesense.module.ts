import { Global, Module } from '@nestjs/common';
import { TypesenseService } from './typesense.service';
import { TypesenseController } from './typesense.controller';

@Global()
@Module({
  providers: [TypesenseService],
  exports: [TypesenseService],
  controllers: [TypesenseController]
})
export class TypesenseModule { }
