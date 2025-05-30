import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './role/role.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { PropertyModule } from './property/property.module';
import { DateResolver, DateTimeResolver } from 'graphql-scalars';
import { TypesenseModule } from './typesense/typesense.module';
import { LocationModule } from './location/location.module';
import { InspectionModule } from './inspection/inspection.module';
import { InvestmentModule } from './investment/investment.module';
import { MortgageModule } from './mortgage/mortgage.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: ['http://localhost:3000', 'https://home-crescent.vercel.app', 'https://homecrescent-developer.vercel.app'],
      },
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      resolvers: {
        Date: DateResolver,
        DateTime: DateTimeResolver,
      },
      playground: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    RoleModule,
    AdminModule,
    UserModule,
    CompanyModule,
    PropertyModule,
    TypesenseModule,
    LocationModule,
    InspectionModule,
    InvestmentModule,
    MortgageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
