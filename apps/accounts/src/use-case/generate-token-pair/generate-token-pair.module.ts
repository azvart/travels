import { Module } from '@nestjs/common';
import { GenerateTokenPairHandler } from './generate-token-pair.handler';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '@app/redis';


@Module({
  imports: [JwtModule, RedisModule],
  providers: [GenerateTokenPairHandler],
  exports: [GenerateTokenPairHandler]
})
export class GenerateTokenPairModule {}
