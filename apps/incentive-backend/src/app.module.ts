import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingMiddleware } from './logging/logging.middleware';
import { JwtModule } from '@nestjs/jwt';

process.env.MONGODB_URL = 'mongodb://localhost:27017/incencitive';

@Module({
  imports: [
    UserModule,
    TransactionModule,
    AuthModule,
    // Use this to import productive or in memory (for testing) database
    MongooseModule.forRoot(process.env.MONGODB_URL),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'SuperSecretToken',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
