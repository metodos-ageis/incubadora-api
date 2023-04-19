import { Injectable } from '@nestjs/common';
import { Company, CompanyProgress } from 'src/interfaces/companies';
import { PrismaService } from '../../database/prisma.service';
import { CompaniesRepository } from './companies.repository';
import { CompanyMetrics, CompanyMetricsGroup } from 'src/dto/metrics';
import { KeysOfType } from 'src/types';

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

  private getMetricsGroup(
    data: CompanyProgress[],
    fields: [keyof CompanyProgress, KeysOfType<CompanyProgress, number>][],
  ): CompanyMetricsGroup {
    const history: CompanyMetricsGroup['history'] = {};

    for (const [field, score] of fields) {
      history[field] = [];

      for (const progress of data) {
        history[field].push({
          date: progress.created_at,
          value: progress[score],
        });
      }
    }

    if (data.length <= 1) {
      return {
        improved: [],
        remained: fields.map(([field]) => field),
        worsened: [],
        overall: 0,
        history,
      };
    }

    const [current, last] = data;

    const improved = [];
    const remained = [];
    const worsened = [];
    let overall = 0;

    for (const [field, score] of fields) {
      const currentScore = current[score];
      const lastScore = last[score];

      if (currentScore > lastScore) {
        improved.push(field);
        overall += 1;
      } else if (currentScore === lastScore) {
        remained.push(field);
      } else {
        worsened.push(field);
        overall -= 1;
      }
    }

    return {
      improved,
      remained,
      worsened,
      overall,
      history,
    };
  }

  getMetrics(progress: CompanyProgress[]) {
    const structure = this.getMetricsGroup(progress, [
      ['canvas', 'canvas_score'],
      ['pitch', 'pitch_score'],
      ['ip', 'ip_score'],
    ]);

    const solution = this.getMetricsGroup(progress, [
      ['development_state', 'development_state_score'],
      ['solution_definition', 'solution_definition_score'],
      ['needed_resources', 'needed_resources_score'],
    ]);

    const market = this.getMetricsGroup(progress, [
      ['ecosystem', 'ecosystem_score'],
      ['definition_validation', 'definition_validation_score'],
      ['clients', 'clients_score'],
      ['concurrency_analysis', 'concurrency_analysis_score'],
      ['market_size', 'market_size_score'],
      ['incoming_method', 'incoming_method_score'],
      ['mvp', 'mvp_score'],
      ['feedback_cycle', 'feedback_cycle_score'],
    ]);

    return {
      market,
      solution,
      structure,
    };
  }

  async getCompanyMetrics(id: string): Promise<CompanyMetrics> {
    const progress = await this.prisma.companies_progress.findMany({
      where: { company_id: id },
      orderBy: { created_at: 'desc' },
    });

    return this.getMetrics(progress);
  }

  async getCompanyMetricsFromProgress(
    companyId: string,
    progressId: string,
  ): Promise<CompanyMetrics> {
    const progress = await this.prisma.companies_progress.findMany({
      where: { company_id: companyId },
      orderBy: { created_at: 'desc' },
    });

    let filteredProgress: CompanyProgress[] = [];
    for (let i = progress.length - 1; i >= 0; i--) {
      const p = progress[i];
      filteredProgress.unshift(p);
      if (p.id === progressId) {
        break;
      }
    }

    return this.getMetrics(filteredProgress);
  }
}
