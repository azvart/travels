import { Module } from '@nestjs/common';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { FindOneQuestHandler } from './find-one-quest.handler';


@Module({
  imports: [GrpcApiClientsModule],
  providers: [FindOneQuestHandler],
  exports: [FindOneQuestHandler]
})
export class FindOneQuestModule {}
