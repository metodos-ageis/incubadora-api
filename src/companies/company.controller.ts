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
import { Company, CompanyProgress, TopicScore } from 'src/interfaces/companies';
import { CompaniesProgressRepository } from 'src/repositories/companies/companies-progress.repository';
import { CompaniesRepository } from 'src/repositories/companies/companies.repository';
import { TopicsScoresRepository } from 'src/repositories/companies/topics-scores.repository';

@Controller('company')
export class CompaniesController {
  constructor(
    private readonly companiesRepository: CompaniesRepository,
    private readonly companyProgressRepo: CompaniesProgressRepository,
    private readonly topicsScoresRepo: TopicsScoresRepository,
  ) {}

  @Get('/:id')
  async getCompany(@Param('id') id: string, @Req() req): Promise<Company> {
    if (!req.headers.token) throw new UnauthorizedException();
    if (!id)
      throw new HttpException('ID não encontrado.', HttpStatus.BAD_REQUEST);
    return this.companiesRepository.getCompany(id);
  }

  @Get()
  async getCompanies(@Req() req): Promise<Company[]> {
    if (!req.headers.token) throw new UnauthorizedException();
    return this.companiesRepository.getCompanies();
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

  @Get('progress/:id')
  async getCompanyProgress(
    @Param('id') companyId: string,
  ): Promise<CompanyProgress[]> {
    if (!companyId)
      throw new HttpException(
        'ID da empresa não encontrado.',
        HttpStatus.BAD_REQUEST,
      );
    return this.companyProgressRepo.getCompanyProgress(companyId);
  }

  @Post('progress')
  async createCompanyProgress(
    @Body() companyProgress: CompanyProgress,
  ): Promise<CompanyProgress> {
    companyProgress.id = randomUUID();
    return this.companyProgressRepo.createCompanyProgress(companyProgress);
  }

  @Put('progress')
  async updateCompanyProgress(
    @Body() companyProgress: CompanyProgress,
  ): Promise<CompanyProgress> {
    if (!companyProgress.id)
      throw new HttpException(
        'ID do progresso não encontrado.',
        HttpStatus.BAD_REQUEST,
      );
    return this.companyProgressRepo.updateCompanyProgress(companyProgress);
  }

  @Get('topics/:id')
  async getTopicsScoresByProgress(
    @Param('id') progressId: string,
  ): Promise<TopicScore[]> {
    if (!progressId)
      throw new HttpException(
        'ID do progresso não encontrado.',
        HttpStatus.BAD_REQUEST,
      );
    return this.topicsScoresRepo.getTopicsByProgress(progressId);
  }

  @Post('topics')
  async createTopicScore(
    @Body() topicScore: TopicScore,
    @Req() req,
  ): Promise<TopicScore> {
    if (!req.headers.token) throw new UnauthorizedException();
    topicScore.id = randomUUID();
    return this.topicsScoresRepo.createTopic(topicScore);
  }

  @Put('topics')
  async updateTopicScore(
    @Body() topicScore: TopicScore,
    @Req() req,
  ): Promise<TopicScore> {
    if (!req.headers.token) throw new UnauthorizedException();
    if (!topicScore.id)
      throw new HttpException(
        'ID do topico não encontrado.',
        HttpStatus.BAD_REQUEST,
      );
    return this.topicsScoresRepo.updateTopic(topicScore);
  }
}
