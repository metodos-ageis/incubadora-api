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
    return this.prisma.users.create({
      data: user,
    });
    /*if(!this.isUserNull(user) && this.userExists(user.cpf_cnpj)==null){
      return this.prisma.users.create({
        data: user,
      })
    }*/
  }
  async deleteUser(id: string): Promise<any> {
    if(id!=null){
      return this.prisma.users.delete({
        where: {
          id: id,
        },
      });
    }
  }
  async updateUser(user: User): Promise<User> {
    if(this.userExists(user.cpf_cnpj)!=null){
    return this.prisma.users.update({
      where: { id: user.id },
      data: user,
    });
    }
    /*if(!this.isUserNull(user) && this.userExists(user.cpf_cnpj)!=null){
      return this.prisma.users.update({
        where: { id: user.id },
        data: user,
      });
    }*/
  }
  private async userExists(cpf_cnpj: string): Promise<User> {
    return this.prisma.users.findFirst({
      where: {
        cpf_cnpj: cpf_cnpj,
      },
    });
  }

  private isUserNull(user: User){
    if(user.cpf_cnpj == null || user.email == null || user.id == null || user.is_active == null || user.name == null || user.phone == null || user.role == null){
      return true;
    }
    return false;
  }
}
