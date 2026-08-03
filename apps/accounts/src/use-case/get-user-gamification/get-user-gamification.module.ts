import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../../infrastructure/user';
import { GetUserGamificationHandler } from './get-user-gamification.handler';

@Module({
  imports: [UserRepositoryModule],
  providers: [GetUserGamificationHandler],
  exports: [GetUserGamificationHandler],
})
export class GetUserGamificationModule {}
