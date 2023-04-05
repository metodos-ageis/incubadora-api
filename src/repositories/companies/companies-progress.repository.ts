import { CompanyProgress } from 'src/interfaces/companies';

export abstract class CompaniesProgressRepository {
  abstract getCompanyProgress(id: string): Promise<CompanyProgress[]>;
  abstract createCompanyProgress(
    companyProgress: CompanyProgress,
  ): Promise<CompanyProgress>;
  abstract updateCompanyProgress(
    companyProgress: CompanyProgress,
  ): Promise<CompanyProgress>;
}
