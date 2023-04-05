import { Injectable } from '@nestjs/common';
import { CompanyProgress } from 'src/interfaces/companies';
import { PrismaService } from '../../database/prisma.service';
import { CompaniesProgressRepository } from './companies-progress.repository';

@Injectable()
export class PrismaCompaniesProgressRepository
  implements CompaniesProgressRepository
{
  constructor(private prisma: PrismaService) {}

  async getCompanyProgress(companyId: string): Promise<CompanyProgress[]> {
    return this.prisma.companies_progress.findMany({
      where: {
        company_id: companyId,
      },
    });
  }
  async createCompanyProgress(
    companyProgress: CompanyProgress,
  ): Promise<CompanyProgress> {
    return this.prisma.companies_progress.create({ data: companyProgress });
  }
  async updateCompanyProgress(
    companyProgress: CompanyProgress,
  ): Promise<CompanyProgress> {
    return this.prisma.companies_progress.update({
      where: {
        id: companyProgress.id,
      },
      data: companyProgress,
    });
  }
}
