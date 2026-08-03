import { Module } from '@nestjs/common';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { FindManyAttachedQuestToUserHandler } from './find-many-attached-quest-to-user.handler';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [FindManyAttachedQuestToUserHandler],
  exports: [FindManyAttachedQuestToUserHandler],
})
export class FindManyAttachedQuestToUserModule {}
