import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CompaniesProgressRepository } from 'src/repositories/companies/companies-progress.repository';
import { CompaniesRepository } from 'src/repositories/companies/companies.repository';
import { PrismaCompaniesProgressRepository } from 'src/repositories/companies/prisma.companies-progress.repository';
import { PrismaCompaniesRepository } from 'src/repositories/companies/prisma.companies.repository';
import { PrismaTopicsScoresRepository } from 'src/repositories/companies/prisma.topics-scores.repository';
import { TopicsScoresRepository } from 'src/repositories/companies/topics-scores.repository';
import { CompaniesController } from './company.controller';

@Module({
  controllers: [CompaniesController],
  providers: [
    PrismaService,
    {
      provide: CompaniesRepository,
      useClass: PrismaCompaniesRepository,
    },
    {
      provide: CompaniesProgressRepository,
      useClass: PrismaCompaniesProgressRepository,
    },
    {
      provide: TopicsScoresRepository,
      useClass: PrismaTopicsScoresRepository,
    },
  ],
})
export class CompanyModule {}
