import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule } from '@nestjs/config';
import { redisProvider } from '@app/redis/redis.provider';
import { AccountsRedisService } from '@app/redis/modules/accounts.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [RedisService, redisProvider, AccountsRedisService],
  exports: [RedisService, redisProvider, AccountsRedisService],
})
export class RedisModule {}
