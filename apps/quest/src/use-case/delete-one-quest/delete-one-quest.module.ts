import { Module } from '@nestjs/common';
import { QuestRepositoryModule } from '../../infrastructure/repositories/quest';
import { DeleteOneQuestHandler } from './delete-one-quest.handler';

@Module({
  imports: [QuestRepositoryModule],
  providers: [DeleteOneQuestHandler],
  exports: [DeleteOneQuestHandler],
})
export class DeleteOneQuestModule {}
