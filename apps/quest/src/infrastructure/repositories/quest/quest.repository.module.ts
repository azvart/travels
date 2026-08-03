import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestEntity, UserQuestEntity } from '@app/entities';
import { QuestAbstractRepository } from './quest.abstract.repository';
import { QuestRepository } from './quest.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestEntity, UserQuestEntity])],
  providers: [
    {
      provide: QuestAbstractRepository,
      useClass: QuestRepository,
    },
  ],
  exports: [
    {
      provide: QuestAbstractRepository,
      useClass: QuestRepository,
    },
  ],
})
export class QuestRepositoryModule {}
