import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { Body, Delete, Param, Patch } from '@nestjs/common/decorators';
import { User } from 'src/interfaces/users';
import { UsersRepository } from 'src/repositories/users/users.repository';

@Controller('user')
export class UserController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get()
  async getUser(@Query() query: { email: string }): Promise<any> {
    return this.usersRepository.getUser(query.email);
  }

  @Post()
  async createUser(@Body() user: User): Promise<any> {
    if (!user.company_id)
      throw new HttpException(
        'ID da empresa não encontrado.',
        HttpStatus.BAD_REQUEST,
      );
    return this.usersRepository.createUser(user);
  }

  @Patch()
  async updateUser(@Body() user: User): Promise<any> {
    return this.usersRepository.updateUser(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return this.usersRepository.deleteUser(id);
  }
}
