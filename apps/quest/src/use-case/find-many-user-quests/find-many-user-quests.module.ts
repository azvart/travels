import { Module } from '@nestjs/common';
import { FindManyUserQuestsHandler } from './find-many-user-quests.handler';
import { UserQuestRepositoryModule } from '../../infrastructure/repositories/user-quest';


@Module({
  imports: [UserQuestRepositoryModule],
  providers: [FindManyUserQuestsHandler],
  exports: [FindManyUserQuestsHandler]
})
export class FindManyUserQuestsModule {}
