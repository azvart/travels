import { Injectable } from '@nestjs/common';
import { CreateNewAccountHandler } from '../use-case/create-new-account/create-new-account.handler';
import { DeleteAccountHandler } from '../use-case/delete-account/delete-account.handler';
import { UpdateExistingAccountHandler } from '../use-case/update-exisitng-account/update-existng-account.handler';
import { LoginHandler } from '../use-case/login/login.handler';
import { LogoutHandler } from '../use-case/logout/logout.handler';
import { ILoginInput, IUpdateAccountInput } from 'libs/interfaces';
import { ICreateNewAccount } from 'libs/interfaces/account/create-new-account.interface';
import { GetAccountHandler } from '../use-case/get-account/get-account.handler';
import { GetAccountByEmailHandler } from '../use-case/get-account-by-email/get-account-by-email.handler';


@Injectable()
export class AccountPresentationService {
  public constructor(
    private readonly createNewAccountHandler: CreateNewAccountHandler,
    private readonly deleteAccountHandler: DeleteAccountHandler,
    private readonly updateExistingAccountHandler: UpdateExistingAccountHandler,
    private readonly loginHandler: LoginHandler,
    private readonly logoutHandler: LogoutHandler,
    private readonly getAccountHandler: GetAccountHandler,
    private readonly getAccountByEmailHandler: GetAccountByEmailHandler,
  ) {}

  public async createNewAccount(input: ICreateNewAccount) {
    return this.createNewAccountHandler.run(input);
  }

  public async deleteAccount(id: string) {
    return this.deleteAccountHandler.run(id);
  }

  public async updateExistingAccount(input: IUpdateAccountInput) {
    return this.updateExistingAccountHandler.run(input);
  }

  public async login(input: ILoginInput) {
    return this.loginHandler.run(input);
  }

  public async logout(ctx) {
    return this.logoutHandler.run(ctx);
  }

  public async getAccount(id: string) {
      return this.getAccountHandler.run(id)
  }
  public async getAccountByEmail(email:string){
    return this.getAccountByEmailHandler.run(email);
  }
}
