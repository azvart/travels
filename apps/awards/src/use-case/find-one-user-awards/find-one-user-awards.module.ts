import { Module } from '@nestjs/common';
import { UserAwardsRepositoryModule } from '../../infrastructure/user-awards/user-awards.repository.module';
import { FindOneUserAwardsHandler } from './find-one-user-awards.handler';

@Module({
  imports: [UserAwardsRepositoryModule],
  providers: [FindOneUserAwardsHandler],
  exports: [FindOneUserAwardsHandler],
})
export class FindOneUserAwardsModule {}
