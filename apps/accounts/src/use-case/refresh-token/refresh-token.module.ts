import { Module } from '@nestjs/common';
import { RefreshTokenHandler } from './refresh-token.handler';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokenPairModule } from '../generate-token-pair/generate-token-pair.module';
import { RedisModule } from '@app/redis';


@Module({
  imports: [JwtModule, GenerateTokenPairModule, RedisModule],
  providers: [RefreshTokenHandler],
  exports: [RefreshTokenHandler]
})
export class RefreshTokenModule {}
