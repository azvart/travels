import { Module } from '@nestjs/common';
import { UserPresentationResolver } from './user-presentation.resolver';
import { UpdateUserModule } from '../use-case/update-user/update-user.module';
import { UserPresentationService } from './user-presentation.service';
import { GetUserFullModule } from '../use-case/get-user-full/get-user-full.module';
import { GetUserTelemetryModule } from '../use-case/get-user-telemetry/get-user-telemetry.module';
import { GetUserGamificationModule } from '../use-case/get-user-gamification/get-user-gamification.module';

@Module({
  imports: [UpdateUserModule, GetUserFullModule, GetUserTelemetryModule, GetUserGamificationModule],
  providers: [UserPresentationResolver, UserPresentationService],
})
export class UserPresentationModule {}

