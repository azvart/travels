import { Module } from '@nestjs/common';
import { CreateUserAwardHandler } from './create-user-award.handler';
import { UserAwardsRepositoryModule } from '../../infrastructure/user-awards/user-awards.repository.module';

@Module({
  imports: [UserAwardsRepositoryModule],
  providers: [CreateUserAwardHandler],
  exports: [CreateUserAwardHandler],
})
export class CreateUserAwardModule {}
