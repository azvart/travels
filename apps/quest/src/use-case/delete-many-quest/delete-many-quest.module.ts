import { Module } from '@nestjs/common';
import { QuestRepositoryModule } from '../../infrastructure/repositories/quest';
import { DeleteOneQuestHandler } from '../delete-one-quest/delete-one-quest.handler';
import { DeleteManyQuestHandler } from './delete-many-quest.handler';

@Module({
  imports: [QuestRepositoryModule],
  providers: [DeleteManyQuestHandler],
  exports: [DeleteManyQuestHandler],
})
export class DeleteManyQuestModule {}
