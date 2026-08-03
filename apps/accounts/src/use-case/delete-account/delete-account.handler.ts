import { Injectable } from '@nestjs/common';
import { AccountAbstractRepository } from '../../infrastructure/account';

@Injectable()
export class DeleteAccountHandler {
  public constructor(private readonly accountRepository: AccountAbstractRepository) {}

  public async run(data: { accountId: string }) {
    return this.accountRepository.deleteAccount(data.accountId);
  }
}
