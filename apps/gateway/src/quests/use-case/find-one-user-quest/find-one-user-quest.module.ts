import { Module } from '@nestjs/common';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { FindOneUserQuestHandler } from './find-one-user-quest.handler';


@Module({
  imports: [GrpcApiClientsModule],
  providers: [FindOneUserQuestHandler],
  exports: [FindOneUserQuestHandler]
})
export class FindOneUserQuestModule {}
