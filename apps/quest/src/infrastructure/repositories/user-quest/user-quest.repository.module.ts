import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity, QuestEntity, UserEntity, UserQuestEntity } from '@app/entities';
import { UserQuestAbstractRepository } from './user-quest.abstract.repository';
import { UserQuestRepository } from './user-quest.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestEntity, UserQuestEntity, UserEntity, AccountEntity])],
  providers: [
    {
      provide: UserQuestAbstractRepository,
      useClass: UserQuestRepository,
    },
  ],
  exports: [
    {
      provide: UserQuestAbstractRepository,
      useClass: UserQuestRepository,
    },
  ],
})
export class UserQuestRepositoryModule {}
