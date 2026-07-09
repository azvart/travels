import { Module } from '@nestjs/common';
import { UserPresentationResolver } from './user-presentation.resolver';
import { UpdateUserModule } from '../use-case/update-user/update-user.module';
import { UserPresentationService } from './user-presentation.service';
import { GetUserFullModule } from '../use-case/get-user-full/get-user-full.module';

@Module({
  imports: [UpdateUserModule, GetUserFullModule],
  providers: [UserPresentationResolver, UserPresentationService],
})
export class UserPresentationModule {}

