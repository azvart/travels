import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwardsEntity, UserAwardsEntity } from '@app/entities';
import { UserAwardsAbstractRepository } from './user-awards.abstract.repository';
import { UserAwardsRepository } from './user-awards.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AwardsEntity, UserAwardsEntity])],
  providers: [
    {
      provide: UserAwardsAbstractRepository,
      useClass: UserAwardsRepository,
    },
  ],
  exports: [
    {
      provide: UserAwardsAbstractRepository,
      useClass: UserAwardsRepository,
    },
  ],
})
export class UserAwardsRepositoryModule {}
