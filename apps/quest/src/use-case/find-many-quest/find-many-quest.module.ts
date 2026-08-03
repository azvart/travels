import { Module } from '@nestjs/common';
import { QuestRepositoryModule } from '../../infrastructure/repositories/quest';
import { FindManyQuestHandler } from './find-many-quest.handler';

@Module({
  imports: [QuestRepositoryModule],
  providers: [FindManyQuestHandler],
  exports: [FindManyQuestHandler],
})
export class FindManyQuestModule {}
