import { Module } from '@nestjs/common';
import { UserQuestRepositoryModule } from '../../infrastructure/repositories/user-quest';
import { FindOneUserQuestHandler } from './find-one-user-quest.handler';


@Module({
  imports: [UserQuestRepositoryModule],
  providers: [FindOneUserQuestHandler],
  exports: [FindOneUserQuestHandler]
})
export class FindOneUserQuestModule {}
