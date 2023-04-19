import { CompanyMetrics } from 'src/dto/metrics';
import { Company } from 'src/interfaces/companies';

export abstract class CompaniesRepository {
  abstract getCompany(id: string): Promise<Company>;
  abstract getCompanies(): Promise<Company[]>;
  abstract createCompany(company: Company): Promise<Company>;
  abstract deleteCompany(id: string): Promise<Company>;
  abstract updateCompany(company: Company): Promise<Company>;
  abstract getCompanyMetrics(id: string): Promise<CompanyMetrics>;
  abstract getCompanyMetricsFromProgress(
    companyId: string,
    progressId: string,
  ): Promise<CompanyMetrics>;
}
