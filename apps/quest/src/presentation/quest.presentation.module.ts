import { Module } from '@nestjs/common';
import { QuestPresentationController } from './quest.presentation.controller';
import { QuestPresentationService } from './quest.presentation.service';
import { CreateQuestModule } from '../use-case/create-quest/create-quest.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestEntity } from '../infrastructure/repositories/quest';
import { UpdateQuestModule } from '../use-case/update-quest/update-quest.module';
import { FindOneQuestModule } from '../use-case/find-one-quest/find-one-quest.module';
import { FindManyQuestModule } from '../use-case/find-many-quest/find-many-quest.module';
import { DeleteOneQuestModule } from '../use-case/delete-one-quest/delete-one-quest.module';
import { DeleteManyQuestModule } from '../use-case/delete-many-quest/delete-many-quest.module';


@Module({
  imports: [
    CreateQuestModule,
    UpdateQuestModule,
    FindOneQuestModule,
    FindManyQuestModule,
    DeleteOneQuestModule,
    DeleteManyQuestModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 54321,
      username: 'root',
      password: 'root_password',
      database: 'travels',
      entities: [QuestEntity],
      synchronize: true,
    }),
  ],
  controllers: [QuestPresentationController],
  providers: [QuestPresentationService]
})
export class QuestPresentationModule {}
