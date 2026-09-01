import { Module } from '@nestjs/common';
import { UserStatisticRepositoryModule } from '../../infrastructure/user-statistic';
import { FindManyUserStatisticHandler } from './find-many-user-statistic.handler';

@Module({
  imports: [UserStatisticRepositoryModule],
  providers: [FindManyUserStatisticHandler],
  exports: [FindManyUserStatisticHandler]
})
export class FindManyUserStatisticModule {}
