import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestEntity } from './quest.entity';
import { QuestAbstractRepository } from './quest.abstract.repository';
import { QuestRepository } from './quest.repository';


@Module({
  imports:[
    TypeOrmModule.forFeature([QuestEntity])
  ],
  providers: [
    {
      provide: QuestAbstractRepository,
      useClass: QuestRepository
    }
  ],
  exports: [
    {
      provide: QuestAbstractRepository,
      useClass: QuestRepository
    }
  ]
})
export class QuestRepositoryModule {}
