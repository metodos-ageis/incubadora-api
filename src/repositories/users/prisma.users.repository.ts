import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from 'src/interfaces/users';
import { PrismaService } from '../../database/prisma.service';
import { UsersRepository } from './users.repository';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async getUser(email: string): Promise<User> {
    if (email != null) {
      return this.prisma.users.findFirst({
        where: {
          email: email,
        },
      });
    }
  }
  async createUser(user: User): Promise<User> {
    const userExists = await this.userExists(user.cpf_cnpj);
    if (!this.isUserNull(user) && !userExists) {
      user.id = randomUUID();
      user.is_active = true;
      return this.prisma.users.create({
        data: user,
      });
    }
  }
  async deleteUser(id: string): Promise<any> {
    if (id != null) {
      return this.prisma.users.delete({
        where: {
          id: id,
        },
      });
    }
  }
  async updateUser(user: User): Promise<User> {
    if (!this.isUserNull(user) && this.userExists(user.cpf_cnpj) != null) {
      return this.prisma.users.update({
        where: { id: user.id },
        data: user,
      });
    }
  }

  private async userExists(cpf_cnpj: string): Promise<User> {
    return this.prisma.users.findFirst({
      where: {
        cpf_cnpj: cpf_cnpj,
      },
    });
  }

  private isUserNull(user: User) {
    if (
      (typeof user.company_id === 'string' &&
        user.company_id.trim().length == 0) ||
      (typeof user.email === 'string' && user.email.trim().length == 0) ||
      (typeof user.role === 'string' && user.role.trim().length == 0) ||
      (typeof user.name === 'string' && user.name.trim().length == 0) ||
      (typeof user.cpf_cnpj === 'string' && user.cpf_cnpj.trim().length == 0) ||
      (typeof user.phone === 'string' && user.phone.trim().length == 0)
    ) {
      return true;
    }
    return false;
  }
}
