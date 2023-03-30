import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { Body, Delete, Put, Req } from '@nestjs/common/decorators';
import { randomUUID } from 'crypto';
import { Company } from 'src/interfaces/companies';
import { CompaniesRepository } from 'src/repositories/companies/companies.repository';

@Controller('company')
export class CompaniesController {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  @Get('/:id')
  async getCompany(@Param('id') id: string, @Req() req): Promise<Company> {
    if (!req.headers.token) throw new UnauthorizedException();
    if (!id)
      throw new HttpException('ID não encontrado.', HttpStatus.BAD_REQUEST);
    return this.companiesRepository.getCompany(id);
  }

  bodyValidator(body: Company): boolean {
    if (!body.title)
      throw new HttpException(
        'O título da incubada é obrigatório.',
        HttpStatus.BAD_REQUEST,
      );
    if (!body.description)
      throw new HttpException(
        'A descrição da incubada é obrigatório.',
        HttpStatus.BAD_REQUEST,
      );
    if (!body.sector)
      throw new HttpException(
        'O setor da incubada é obrigatório.',
        HttpStatus.BAD_REQUEST,
      );
    if (!body.goal)
      throw new HttpException(
        'O objetivo da incubada é obrigatório.',
        HttpStatus.BAD_REQUEST,
      );
    return true;
  }

  @Post()
  async createCompany(@Body() company: Company, @Req() req): Promise<Company> {
    if (!req.headers.token) throw new UnauthorizedException();
    if (this.bodyValidator(company)) {
      company.id = randomUUID();
      return this.companiesRepository.createCompany(company);
    }
  }

  @Put()
  async updateCompany(@Body() company: Company, @Req() req): Promise<Company> {
    if (!req.headers.token) throw new UnauthorizedException();
    const foundCompany = await this.getCompany(company.id, req);
    if (foundCompany) return this.companiesRepository.updateCompany(company);
    else
      throw new HttpException(
        'Empresa não encontrada.',
        HttpStatus.BAD_REQUEST,
      );
  }

  @Delete(':id')
  async deleteCompany(@Param('id') id: string, @Req() req): Promise<unknown> {
    if (!req.headers.token) throw new UnauthorizedException();
    const foundCompany = await this.getCompany(id, req);
    if (foundCompany) return this.companiesRepository.deleteCompany(id);
  }
}
