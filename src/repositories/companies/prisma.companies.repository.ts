import { Injectable } from '@nestjs/common';
import { Company } from 'src/interfaces/companies';
import { PrismaService } from '../../database/prisma.service';
import { CompaniesRepository } from './companies.repository';

@Injectable()
export class PrismaCompaniesRepository implements CompaniesRepository {
  constructor(private prisma: PrismaService) {}

  async getCompany(id: string): Promise<Company> {
    return this.prisma.companies.findFirst({
      where: {
        id,
      },
    });
  }

  async getCompanies(): Promise<Company[]> {
    return this.prisma.companies.findMany({
      where: {
        deleted_at: null,
      },
    });
  }

  async createCompany(company: Company): Promise<Company> {
    return this.prisma.companies.create({ data: company });
  }

  async deleteCompany(id: string): Promise<Company> {
    const deletedAt = new Date();
    return this.prisma.companies.update({
      where: {
        id: id,
      },
      data: {
        deleted_at: deletedAt,
      },
    });
  }

  async updateCompany(company: Company): Promise<Company> {
    return this.prisma.companies.update({
      where: {
        id: company.id,
      },
      data: company,
    });
  }
}
