import { Injectable } from '@nestjs/common';
import { CreateAccountHandler } from '../use-case/create-account/create-account.handler';
import { UpdateAccountHandler } from '../use-case/update-account/update-account.handler';
import { DeleteAccountHandler } from '../use-case/delete-account/delete-account.handler';
import { LoginHandler } from '../use-case/login/login.handler';
import { RefreshTokenHandler } from '../use-case/refresh-token/refresh-token.handler';
import { UpdateUserHandler } from '../use-case/update-user/update-user.handler';
import { GetUserHandler } from '../use-case/get-user/get-user.handler';
import { ICreateNewAccount } from 'libs/interfaces/account/create-new-account.interface';
import {
  IGetUser,
  ILoginInput,
  ILogout,
  IRefreshToken,
  IUpdateAccountInput,
  IUpdateUserInputInterface,
} from 'libs/interfaces';

@Injectable()
export class AccountPresentationService {

  public constructor(
    private readonly createAccountHandler: CreateAccountHandler,
    private readonly updateAccountHandler: UpdateAccountHandler,
    private readonly deleteAccountHandler: DeleteAccountHandler,
    private readonly loginHandler: LoginHandler,
    private readonly refreshTokenHandler: RefreshTokenHandler,
    private readonly updateUserHandler: UpdateUserHandler,
    private readonly getUserHandler: GetUserHandler
  ){}


  public async createAccount(data:ICreateNewAccount){
    return this.createAccountHandler.run(data);
  }

  public async updateAccount(data:IUpdateAccountInput){
    const accountObj:Omit<IUpdateAccountInput, 'id'> = {
      email:data.email,
      password: data.password
    }
    return this.updateAccountHandler.run(data.id, accountObj);
  }

  public async deleteAccount(data: {accountId: string}){
    return this.deleteAccountHandler.run(data);
  }

  public async login(data:ILoginInput){
    return this.loginHandler.run(data);
  }

  public async refreshToken(data:IRefreshToken){
    return this.refreshTokenHandler.run(data.refreshToken);
  }

  public async updateUser(data:IUpdateUserInputInterface){
    const userObj:Omit<IUpdateUserInputInterface, 'id'> = {
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      city: data.city,
      country: data.country,
      countryCode: data.countryCode,
      street: data.street
    }
    return this.updateUserHandler.run(data.id, userObj);
  }

  public async getUser(data:IGetUser){
    return this.getUserHandler.run(data);
  }
}
