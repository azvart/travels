import { Module } from '@nestjs/common';
import { AccountPresentationController } from './account.presentation.controller';
import { AccountPresentationService } from './account.presentation.service';
import { CreateAccountModule } from '../use-case/create-account/create-account.module';
import { UpdateAccountModule } from '../use-case/update-account/update-account.module';
import { DeleteAccountModule } from '../use-case/delete-account/delete-account.module';
import { GetUserModule } from '../use-case/get-user/get-user.module';
import { LoginModule } from '../use-case/login/login.module';
import { RefreshTokenModule } from '../use-case/refresh-token/refresh-token.module';
import { UpdateUserModule } from '../use-case/update-user/update-user.module';
import { GetUserTelemetryModule } from '../use-case/get-user-telemetry/get-user-telemetry.module';
import { GetUserGamificationModule } from '../use-case/get-user-gamification/get-user-gamification.module';
import { UpdateUserTelemetryModule } from '../use-case/update-user-telemetry/update-user-telemetry.module';
import { CreateUserTelemetryModule } from '../use-case/create-user-telemetry/create-user-telemetry.module';
import { CreateUserStatisticModule } from '../use-case/create-user-statistic/create-user-statistic.module';
import { UpdateUserStatisticModule } from '../use-case/update-user-statistic/update-user-statistic.module';
import { FindOneUserStatisticModule } from '../use-case/find-one-user-statistic/find-one-user-statistic.module';
import { FindManyUserStatisticModule } from '../use-case/find-many-user-statistic/find-many-user-statistic.module';

@Module({
  imports: [
    CreateAccountModule,
    UpdateAccountModule,
    DeleteAccountModule,
    GetUserModule,
    LoginModule,
    RefreshTokenModule,
    UpdateUserModule,
    GetUserTelemetryModule,
    GetUserGamificationModule,
    UpdateUserTelemetryModule,
    CreateUserTelemetryModule,
    CreateUserStatisticModule,
    UpdateUserStatisticModule,
    FindOneUserStatisticModule,
    FindManyUserStatisticModule
  ],
  controllers: [AccountPresentationController],
  providers: [AccountPresentationService],
})
export class AccountPresentationModule {}
