import { Module } from '@nestjs/common';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { FindManyUserQuestsHandler } from './find-many-user-quests.handler';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [FindManyUserQuestsHandler],
  exports: [FindManyUserQuestsHandler],
})
export class FindManyUserQuestsModule {}
