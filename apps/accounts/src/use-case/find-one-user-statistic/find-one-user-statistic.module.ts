import { Module } from '@nestjs/common';
import { UserStatisticRepositoryModule } from '../../infrastructure/user-statistic';
import { FindOneUserStatisticHandler } from './find-one-user-statistic.handler';


@Module({
  imports: [UserStatisticRepositoryModule],
  providers: [FindOneUserStatisticHandler],
  exports: [FindOneUserStatisticHandler],
})
export class FindOneUserStatisticModule {}
