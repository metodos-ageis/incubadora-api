import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaUsersRepository } from 'src/repositories/users/prisma.users.repository';
import { UsersRepository } from 'src/repositories/users/users.repository';
import { ManagerController } from './manager.controller';

@Module({
  controllers: [ManagerController],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class ManagerModule {}
