<<<<<<< HEAD
import { Controller, Get, Param, Post } from '@nestjs/common';
=======
import { Controller, Get, Post, Param, Query } from '@nestjs/common';
>>>>>>> 6c78ebed529c9adbc92b1af9325e9d10bd338b82
import { Body, Delete, Patch } from '@nestjs/common/decorators';
import { User } from 'src/interfaces/users';
import { UsersRepository } from 'src/repositories/users/users.repository';

@Controller('user')
export class UserController {
  constructor(private readonly usersRepository: UsersRepository) {}

<<<<<<< HEAD
  @Get(':email')
  async getUser(@Param('email') email: string): Promise<any> {
    return this.usersRepository.getUser(email);
=======
  @Get()
  async getUser(@Query() query: { email: string }): Promise<any> {
    return this.usersRepository.getUser(query.email);
>>>>>>> 6c78ebed529c9adbc92b1af9325e9d10bd338b82
  }

  @Post()
  async createUser(@Body() user: User): Promise<any> {
    return this.usersRepository.createUser(user);
  }

  @Patch()
  async updateUser(@Body() user: User): Promise<any> {
    return this.usersRepository.updateUser(user);
  }

<<<<<<< HEAD
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return this.usersRepository.deleteUser(id);
=======
  @Delete()
  async deleteUser(@Query() query: { id: string }): Promise<any> {
    return this.usersRepository.deleteUser(query.id);
>>>>>>> 6c78ebed529c9adbc92b1af9325e9d10bd338b82
  }
}
