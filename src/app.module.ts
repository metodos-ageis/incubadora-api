import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './companies/company.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, CompanyModule],
})
export class AppModule {}
