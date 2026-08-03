import { Module } from '@nestjs/common';
import { QuestsPresentationResolver } from './quests-presentation.resolver';
import { QuestsPresentationService } from './quests-presentation.service';
import { CreateQuestModule } from '../use-case/create-quest/create-quest.module';
import { UpdateQuestModule } from '../use-case/update-quest/update-quest.module';
import { FindOneQuestModule } from '../use-case/find-one-quest/find-one-quest.module';
import { FindManyQuestsModule } from '../use-case/find-many-quests/find-many-quests.module';
import { DeleteManyQuestsModule } from '../use-case/delete-many-quests/delete-many-quests.module';
import { DeleteOneQuestModule } from '../use-case/delete-one-quest/delete-one-quest.module';
import { AttachQuestToUserModule } from '../use-case/attach-quest-to-user/attach-quest-to-user.module';
import { FindManyAttachedQuestToUserModule } from '../use-case/find-many-attached-quest-to-user/find-many-attached-quest-to-user.module';
import { FindOneUserQuestModule } from '../use-case/find-one-user-quest/find-one-user-quest.module';
import { FindManyUserQuestsModule } from '../use-case/find-many-user-quests/find-many-user-quests.module';
import { UserQuestPresentationResolver } from './user-quest.presentation.resolver';

@Module({
  imports: [
    CreateQuestModule,
    UpdateQuestModule,
    FindOneQuestModule,
    FindManyQuestsModule,
    DeleteManyQuestsModule,
    DeleteOneQuestModule,
    AttachQuestToUserModule,
    FindManyAttachedQuestToUserModule,
    FindOneUserQuestModule,
    FindManyUserQuestsModule,
  ],
  providers: [QuestsPresentationResolver, QuestsPresentationService, UserQuestPresentationResolver],
})
export class QuestsPresentationModule {}
