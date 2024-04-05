import { TasksModule } from './tasks/tasks.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import getMongoUrl from './utils/get-mongo-url';
import { AppLoggerMiddleware } from './utils/logger.middleware';
import { AuthService } from './modules/auth/auth.service';
import { LocalStrategy } from './modules/auth/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from './modules/admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/auth/roles/roles.guard';
import { AirdropModule } from './modules/airdrop/airdrop.module';

@Module({
  imports: [
    // Config .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Passport
    PassportModule,
    JwtModule,

    // Cronjob
    ScheduleModule.forRoot(),
    TasksModule,

    // Config mongoose
    MongooseModule.forRoot(getMongoUrl(), {
      autoIndex: true,
      autoCreate: true,
    }),

    AuthModule,
    AdminModule,
    AirdropModule,
  ],
  controllers: [],
  providers: [
    AuthService,
    LocalStrategy,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
