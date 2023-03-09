import { Controller, Get, Post, Param } from '@nestjs/common';
import { Body, Delete, Patch } from '@nestjs/common/decorators';
import { UsersRepository } from 'src/repositories/users/users.repository';
import { User } from 'src/interfaces/users';

@Controller('manager')
export class ManagerController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get(':email')
  async getUser(@Param('email') email: string): Promise<any> {
    return this.usersRepository.getUser('gerente@gmail.com');
  }

  @Post()
  async createUser(@Body() user: User): Promise<any>{
    return this.usersRepository.createUser(user);
  }

  @Patch()
  async updateUser(@Body() user: User): Promise<any>{
    return this.usersRepository.updateUser(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any>{
    return this.usersRepository.deleteUser(id);
  }
}
