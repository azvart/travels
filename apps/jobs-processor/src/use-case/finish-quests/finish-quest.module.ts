import { Module } from '@nestjs/common';
import { RedisModule } from '@app/redis';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { FinishQuestHandler } from './finish-quest.handler';


@Module({
  imports: [RedisModule, GrpcApiClientsModule],
  providers: [FinishQuestHandler],
  exports: [FinishQuestHandler],
})
export class FinishQuestModule {}
