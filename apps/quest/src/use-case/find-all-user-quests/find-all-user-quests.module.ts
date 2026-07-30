import { Module } from '@nestjs/common';
import { FindAllUserQuestsHandler } from './find-all-user-quests.handler';
import { UserQuestRepositoryModule } from '../../infrastructure/repositories/user-quest';


@Module({
  imports: [UserQuestRepositoryModule],
  providers: [FindAllUserQuestsHandler],
  exports: [FindAllUserQuestsHandler]
})
export class FindAllUserQuestsModule {}
