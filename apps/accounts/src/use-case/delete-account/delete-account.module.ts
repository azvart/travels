import { Module } from '@nestjs/common';
import { DeleteAccountHandler } from './delete-account.handler';
import { AccountRepositoryModule } from '../../infrastructure/account';


@Module({
  imports: [AccountRepositoryModule],
  providers: [DeleteAccountHandler],
  exports: [DeleteAccountHandler]
})
export class DeleteAccountModule {}
