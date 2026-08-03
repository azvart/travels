import { Module } from '@nestjs/common';
import { UserQuestUpdateHandler } from './user-quest-update.handler';
import { PubSubModule } from '@app/pubsub';

@Module({
  imports: [PubSubModule],
  providers: [UserQuestUpdateHandler],
  exports: [UserQuestUpdateHandler],
})
export class UserQuestUpdateModule {}
