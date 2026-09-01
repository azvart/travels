import { Module } from '@nestjs/common';
import { CreateAttachedUserQuestInRedisHandler } from './create-attached-user-quest-in-redis.handler';
import { RedisModule } from '@app/redis';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';


@Module({
  imports: [RedisModule, GrpcApiClientsModule],
  providers: [CreateAttachedUserQuestInRedisHandler],
  exports: [CreateAttachedUserQuestInRedisHandler]
})
export class CreateAttachedUserQuestInRedisModule {}
