import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
// import { ClientModule } from '../client/client.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { AdminModule } from '../admin/admin.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JsonWebTokenStrategy } from './strategies/jwt.strategy';
import { JWT_CONSTANTS } from './constants';
import { DaoModule } from '../dao/dao.module';

@Module({
  imports: [
    JwtModule.register({ secret: JWT_CONSTANTS.Secret, signOptions: {} }),
    AdminModule,
    DaoModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JsonWebTokenStrategy, RolesGuard],
  exports: [AuthService, RolesGuard],
})
export class AuthModule {}
