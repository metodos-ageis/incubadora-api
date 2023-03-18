import { Company } from 'src/interfaces/companies';

export abstract class CompaniesRepository {
  abstract getCompany(id: string): Promise<Company>;
  abstract createCompany(company: Company): Promise<Company>;
  abstract deleteCompany(id: string): Promise<Company>;
  abstract updateCompany(user: Company): Promise<Company>;
}
