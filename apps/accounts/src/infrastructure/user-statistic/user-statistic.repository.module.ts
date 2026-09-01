import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserStatisticEntity } from '@app/entities';
import { UserStatisticAbstractRepository } from './user-statistic.abstract.repository';
import { UserStatisticRepository } from './user-statistic.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserStatisticEntity, UserEntity])],
  providers: [
    {
      provide: UserStatisticAbstractRepository,
      useClass: UserStatisticRepository,
    },
  ],
  exports: [
    {
      provide: UserStatisticAbstractRepository,
      useClass: UserStatisticRepository,
    },
  ],
})
export class UserStatisticRepositoryModule {}
