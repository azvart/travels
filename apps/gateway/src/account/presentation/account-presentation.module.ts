import { Module } from '@nestjs/common';
import { AccountPresentationResolver } from './account-presentation.resolver';
import { AccountPresentationService } from './account-presentation.service';
import { CreateNewAccountModule } from '../use-case/create-new-account/create-new-account.module';
import { DeleteAccountModule } from '../use-case/delete-account/delete-account.module';
import { UpdateExistingAccountModule } from '../use-case/update-exisitng-account/update-existing-account.module';
import { LoginModule } from '../use-case/login/login.module';
import { RefreshTokenModule } from '../use-case/refresh-token/refresh-token.module';


@Module({
  imports: [
    CreateNewAccountModule,
    DeleteAccountModule,
    UpdateExistingAccountModule,
    LoginModule,
    RefreshTokenModule
  ],
  providers: [AccountPresentationResolver, AccountPresentationService],
})
export class AccountPresentationModule {}
