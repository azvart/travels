import { Module } from '@nestjs/common';
import { UserQuestRepositoryModule } from '../../infrastructure/repositories/user-quest';
import { DeleteQuestsHandler } from './delete-quests.handler';


@Module({
  imports: [UserQuestRepositoryModule],
  providers: [DeleteQuestsHandler],
  exports: [DeleteQuestsHandler]
})
export class DeleteQuestsModule {}
