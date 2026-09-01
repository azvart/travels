import { Module } from '@nestjs/common';
import { AttachQuestToUserHandler } from './attach-quest-to-user.handler';
import { UserQuestRepositoryModule } from '../../infrastructure/repositories/user-quest';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';


@Module({
  imports: [UserQuestRepositoryModule, GrpcApiClientsModule],
  providers: [AttachQuestToUserHandler],
  exports: [AttachQuestToUserHandler],
})
export class AttachQuestToUserModule {}
