import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/users';
import { PrismaService } from '../../database/prisma.service';
import { UsersRepository } from './users.repository';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async getUser(email: string): Promise<User> {
    return this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });
  }
  async createUser(user: User): Promise<User> {
    // implementar
    return true as unknown as User;
  }
  async deleteUser(id: string): Promise<any> {
    // implementar
    return true;
  }
  async updateUser(user: User): Promise<User> {
    // implementar
    return true as unknown as User;
  }
}
