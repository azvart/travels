import { Module } from '@nestjs/common';
import { UserStatisticRepositoryModule } from '../../infrastructure/user-statistic';
import { UpdateUserStatisticHandler } from './update-user-statistic.handler';


@Module({
  imports: [UserStatisticRepositoryModule],
  providers: [UpdateUserStatisticHandler],
  exports: [UpdateUserStatisticHandler],
})
export class UpdateUserStatisticModule {}
