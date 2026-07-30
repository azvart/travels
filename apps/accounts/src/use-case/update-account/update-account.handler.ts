import { Injectable } from '@nestjs/common';
import { AccountAbstractRepository } from '../../infrastructure/account';
import { IUpdateAccountInput } from 'libs/interfaces';


@Injectable()
export class UpdateAccountHandler {

  public constructor(
    private readonly accountRepository: AccountAbstractRepository
  ){}


  public async run(accountId: string, data: Omit<IUpdateAccountInput, 'id'>){
    return this.accountRepository.updateAccount(accountId, data);
  }
}
