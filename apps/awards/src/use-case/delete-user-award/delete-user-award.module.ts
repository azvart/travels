import { Module } from '@nestjs/common';
import { UserAwardsRepositoryModule } from '../../infrastructure/user-awards/user-awards.repository.module';
import { DeleteUserAwardHandler } from './delete-user-award.handler';

@Module({
  imports: [UserAwardsRepositoryModule],
  providers: [DeleteUserAwardHandler],
  exports: [DeleteUserAwardHandler],
})
export class DeleteUserAwardModule {}
