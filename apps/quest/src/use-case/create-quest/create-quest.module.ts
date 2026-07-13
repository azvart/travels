import { Module } from '@nestjs/common';
import { CreateQuestHandler } from './create-quest.handler';
import { QuestRepositoryModule } from '../../infrastructure/repositories/quest';


@Module({
  imports: [
    QuestRepositoryModule
  ],
  providers: [CreateQuestHandler],
  exports: [CreateQuestHandler],
})
export class CreateQuestModule {}
