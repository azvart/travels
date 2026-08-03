import { Module } from '@nestjs/common';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { AttachQuestToUserHandler } from './attach-quest-to-user.handler';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [AttachQuestToUserHandler],
  exports: [AttachQuestToUserHandler],
})
export class AttachQuestToUserModule {}
