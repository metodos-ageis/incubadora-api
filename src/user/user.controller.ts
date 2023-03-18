import { Controller, Get, Post, Query } from '@nestjs/common';
import { Body, Delete, Patch } from '@nestjs/common/decorators';
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
    return this.usersRepository.createUser(user);
  }

  @Patch()
  async updateUser(@Body() user: User): Promise<any> {
    return this.usersRepository.updateUser(user);
  }

  @Delete()
  async deleteUser(@Query() query: { id: string }): Promise<any> {
    return this.usersRepository.deleteUser(query.id);
  }
}
