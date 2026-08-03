import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule } from '@nestjs/config';
import { redisProvider } from '@app/redis/redis.provider';
import { AccountsRedisService } from '@app/redis/modules/accounts.service';
import { UserRedisService } from '@app/redis/modules/user.service';
import { UserQuestService } from '@app/redis/modules/user-quest.service';
import { UserTelemetryService } from '@app/redis/modules/user-telemetry.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    RedisService,
    redisProvider,
    AccountsRedisService,
    UserRedisService,
    UserQuestService,
    UserTelemetryService,
  ],
  exports: [
    RedisService,
    redisProvider,
    AccountsRedisService,
    UserRedisService,
    UserQuestService,
    UserTelemetryService,
  ],
})
export class RedisModule {}
