import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountAbstractRepository } from './account.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '@app/entities/enity';
import { Repository } from 'typeorm';
import { ILoginInput, IUpdateAccountInput } from 'libs/interfaces';
import { ICreateNewAccount } from 'libs/interfaces/account/create-new-account.interface';


@Injectable()
export class AccountRepository
  implements AccountAbstractRepository {

  public constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>
  ){}



  public async createAccount(data:ICreateNewAccount){
    return this.accountRepository.save(
      this.accountRepository.create(data)
    )
  }


  public async updateAccount(accountId: string, data: Omit<IUpdateAccountInput, 'id'>){
    const updatedAccount = await this.accountRepository.update(accountId, data);

    if(!updatedAccount.affected){
      throw new Error(`Account with id ${accountId} can't be update`);
    }

    return this.accountRepository.findOneOrFail({
      where: {
        id: accountId
      }
    })
  }


  public async deleteAccount(accountId: string){
    const deletedAccount = await this.accountRepository.delete(accountId);

    if(!deletedAccount.affected){
      throw new Error(`Can't delete account with id ${accountId}`);
    }
    return accountId;
  }

  public async login(data:Omit<ILoginInput, 'password'>){
    const account = await this.accountRepository.findOneOrFail({
      where: {
        email: data.email
      }
    });

    if(!account){
      throw new Error("Please enter a valid email")
    }

    return account;
  }
}
