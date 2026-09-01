import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { AuthGuard } from '@app/auth/auth.guard';
import { RolesGuard } from '@app/auth/roles.guard';
import { GqlExceptionErrorFilter } from '@app/auth/exception.filter';

@Module({
  imports: [JwtModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [JwtModule],
})
export class AuthModule {}
