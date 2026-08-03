import { Module } from '@nestjs/common';
import { AttachQuestToUserHandler } from './attach-quest-to-user.handler';
import { UserQuestRepositoryModule } from '../../infrastructure/repositories/user-quest';
import { RedisModule, UserQuestService } from '@app/redis';

@Module({
  imports: [UserQuestRepositoryModule, RedisModule],
  providers: [AttachQuestToUserHandler],
  exports: [AttachQuestToUserHandler],
})
export class AttachQuestToUserModule {}
