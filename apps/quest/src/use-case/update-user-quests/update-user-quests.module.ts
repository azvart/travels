import { Module } from '@nestjs/common';
import { UserQuestRepositoryModule } from '../../infrastructure/repositories/user-quest';
import { UpdateUserQuestsHandler } from './update-user-quests.handler';


@Module({
  imports: [UserQuestRepositoryModule],
  providers: [UpdateUserQuestsHandler],
  exports: [UpdateUserQuestsHandler]
})
export class UpdateUserQuestsModule {}
