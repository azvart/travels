import { Module } from '@nestjs/common';
import { QuestRepositoryModule } from '../../infrastructure/repositories/quest';
import { FindOneQuestHandler } from './find-one-quest.handler';


@Module({
  imports: [QuestRepositoryModule],
  providers: [FindOneQuestHandler],
  exports: [FindOneQuestHandler]
})
export class FindOneQuestModule {}
