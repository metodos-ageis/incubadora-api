import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CompaniesRepository } from 'src/repositories/companies/companies.repository';
import { PrismaCompaniesRepository } from 'src/repositories/companies/prisma.companies.repository';
import { CompaniesController } from './company.controller';

@Module({
  controllers: [CompaniesController],
  providers: [
    PrismaService,
    {
      provide: CompaniesRepository,
      useClass: PrismaCompaniesRepository,
    },
  ],
})
export class CompanyModule {}
