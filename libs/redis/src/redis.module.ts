import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule } from '@nestjs/config';
import { redisProvider } from '@app/redis/redis.provider';
import { AccountsRedisService } from '@app/redis/modules/accounts.service';
import { AchievementRedisService } from '@app/redis/modules/achievements.service';
import { UserRedisService } from '@app/redis/modules/user.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    RedisService,
    redisProvider,
    AccountsRedisService,
    UserRedisService,
    AchievementRedisService,
  ],
  exports: [
    RedisService,
    redisProvider,
    AccountsRedisService,
    UserRedisService,
    AchievementRedisService,
  ],
})
export class RedisModule {}
