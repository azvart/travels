import { Module } from '@nestjs/common';
import { UserAwardsRepositoryModule } from '../../infrastructure/user-awards/user-awards.repository.module';
import { FindManyUserAwardsHandler } from './find-many-user-awards.handler';

@Module({
  imports: [UserAwardsRepositoryModule],
  providers: [FindManyUserAwardsHandler],
  exports: [FindManyUserAwardsHandler],
})
export class FindManyUserAwardsModule {}
