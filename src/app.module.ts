import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    TransactionModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/incencitive')
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
