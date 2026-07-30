import { Module } from '@nestjs/common';
import { QuestPresentationController } from './quest.presentation.controller';
import { QuestPresentationService } from './quest.presentation.service';
import { CreateQuestModule } from '../use-case/create-quest/create-quest.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity, QuestEntity, UserEntity, UserQuestEntity } from '@app/entities';
import { UpdateQuestModule } from '../use-case/update-quest/update-quest.module';
import { FindOneQuestModule } from '../use-case/find-one-quest/find-one-quest.module';
import { FindManyQuestModule } from '../use-case/find-many-quest/find-many-quest.module';
import { DeleteOneQuestModule } from '../use-case/delete-one-quest/delete-one-quest.module';
import { DeleteManyQuestModule } from '../use-case/delete-many-quest/delete-many-quest.module';
import { AttachQuestToUserModule } from '../use-case/attach-quest-to-user/attach-quest-to-user.module';
import { CompleteQuestsModule } from '../use-case/complete-quests/complete-quests.module';
import { DeleteQuestsModule } from '../use-case/delete-quests/delete-quests.module';
import { UpdateUserQuestsModule } from '../use-case/update-user-quests/update-user-quests.module';
import { FindManyUserQuestsModule } from '../use-case/find-many-user-quests/find-many-user-quests.module';
import { FindOneUserQuestModule } from '../use-case/find-one-user-quest/find-one-user-quest.module';
import { FindAllUserQuestsModule } from '../use-case/find-all-user-quests/find-all-user-quests.module';


@Module({
  imports: [
    CreateQuestModule,
    UpdateQuestModule,
    FindOneQuestModule,
    FindManyQuestModule,
    DeleteOneQuestModule,
    DeleteManyQuestModule,
    AttachQuestToUserModule,
    CompleteQuestsModule,
    DeleteQuestsModule,
    UpdateUserQuestsModule,
    FindManyUserQuestsModule,
    FindOneUserQuestModule,
    FindAllUserQuestsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 54321,
      username: 'root',
      password: 'root_password',
      database: 'travels',
      entities: [QuestEntity, UserQuestEntity, UserEntity, AccountEntity],
      synchronize: true,
    }),
  ],
  controllers: [QuestPresentationController],
  providers: [QuestPresentationService],
})
export class QuestPresentationModule {}
