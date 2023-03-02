import { Controller, Get } from '@nestjs/common';
import { UsersRepository } from 'src/repositories/users/users.repository';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get()
  async getUser(email: string): Promise<any> {
    return this.usersRepository.getUser('gerente@gmail.com');
  }
}
