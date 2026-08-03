import { Module } from '@nestjs/common';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { DeleteOneQuestHandler } from './delete-one-quest.handler';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [DeleteOneQuestHandler],
  exports: [DeleteOneQuestHandler],
})
export class DeleteOneQuestModule {}
