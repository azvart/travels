import { Module } from '@nestjs/common';
import { QuestRepositoryModule } from '../../infrastructure/repositories/quest';
import { UpdateQuestHandler } from './update-quest.handler';

@Module({
  imports: [QuestRepositoryModule],
  providers: [UpdateQuestHandler],
  exports: [UpdateQuestHandler],
})
export class UpdateQuestModule {}
