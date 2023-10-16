import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [LoginController, RegisterController]
})
export class AuthModule {}
