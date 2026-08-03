import { Module } from '@nestjs/common';
import { UserQuestRepositoryModule } from '../../infrastructure/repositories/user-quest';
import { CompleteQuestsHandler } from './complete-quests.handler';

@Module({
  imports: [UserQuestRepositoryModule],
  providers: [CompleteQuestsHandler],
  exports: [CompleteQuestsHandler],
})
export class CompleteQuestsModule {}
