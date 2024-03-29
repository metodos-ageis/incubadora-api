import { CompanyProgress } from 'src/interfaces/companies';

export abstract class CompaniesProgressRepository {
  abstract getCompanyProgress(
    id: string,
    progressId: string,
  ): Promise<CompanyProgress>;
  abstract createCompanyProgress(
    companyProgress: CompanyProgress,
  ): Promise<CompanyProgress>;
  abstract updateCompanyProgress(
    companyProgress: CompanyProgress,
  ): Promise<CompanyProgress>;
  abstract getLastCompanyProgress(id: string): Promise<CompanyProgress>;
}
