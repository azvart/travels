import { Module } from '@nestjs/common';
import { UpdateAccountHandler } from './update-account.handler';
import { AccountRepositoryModule } from '../../infrastructure/account';


@Module({
  imports: [AccountRepositoryModule],
  providers: [UpdateAccountHandler],
  exports: [UpdateAccountHandler],
})
export class UpdateAccountModule {}
