import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/auth/auth.guard';

@Module({
  imports:[
    JwtModule
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  exports: [JwtModule],
})
export class AuthModule {}
