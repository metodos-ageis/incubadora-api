import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [AuthModule, ManagerModule],
})
export class AppModule {}
