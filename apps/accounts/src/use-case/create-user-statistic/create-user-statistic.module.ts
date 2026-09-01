import { Module } from '@nestjs/common';
import { UserStatisticRepositoryModule } from '../../infrastructure/user-statistic';
import { CreateUserStatisticHandler } from './create-user-statistic.handler';


@Module({
  imports: [UserStatisticRepositoryModule],
  providers: [CreateUserStatisticHandler],
  exports: [CreateUserStatisticHandler],
})
export class CreateUserStatisticModule {}
