import { Module } from '@nestjs/common';
import { UserAwardsRepositoryModule } from '../../infrastructure/user-awards/user-awards.repository.module';
import { UpdateUserAwardHandler } from './update-user-award.handler';

@Module({
  imports: [UserAwardsRepositoryModule],
  providers: [UpdateUserAwardHandler],
  exports: [UpdateUserAwardHandler],
})
export class UpdateUserAwardModule {}
