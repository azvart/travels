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
import { RedisModule } from '@app/redis';


@Module({
  imports: [
    CreateAccountModule,
    UpdateAccountModule,
    DeleteAccountModule,
    GetUserModule,
    LoginModule,
    RefreshTokenModule,
    UpdateUserModule,
  ],
  controllers: [AccountPresentationController],
  providers: [AccountPresentationService]
})
export class AccountPresentationModule {}
