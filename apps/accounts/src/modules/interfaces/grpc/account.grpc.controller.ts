import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AccountService } from '../../application/account.service';

@Controller()
export class AccountGrpcController {
  public constructor(private readonly accountService: AccountService) {}

  @GrpcMethod('Account', 'createNewAccount')
  public async createNewAccount(data: {
    email: string;
    password: string;
    registrationType: string;
  }) {
    return this.accountService.createNewAccount(
      data.email,
      data.password,
      data.registrationType,
    );
  }

  @GrpcMethod('Account', 'updateExistAccount')
  public async updateExistAccount(data: {
    id: string;
    email: string;
    password: string;
  }) {
    return this.accountService.updateAccount({
      id: data.id,
      email: data.email,
      password: data.password,
    });
  }

  @GrpcMethod('Account', 'deleteAccount')
  public async deleteAccount(data: { id: string }) {
    return this.accountService.deleteAccount(data.id);
  }

  @GrpcMethod('Account', 'getAccount')
  async getAccount(data: { id: string }) {
    return this.accountService.getAccountById(data.id);
  }

  @GrpcMethod('Account', 'getAccountByEmail')
  public async getAccountByEmail(data: { email: string }) {
    return this.accountService.getAccountByEmail(data.email);
  }

  @GrpcMethod('Account', 'verifyEmailAccount')
  public async verifyAccountEmail(data: { email: string; id: string }) {
    return this.accountService.verifyAccountEmail(data.email, data.id);
  }

  @GrpcMethod('Account', 'login')
  public async login(data: { email: string; password: string }) {
    return this.accountService.login(data.email, data.password);
  }

  @GrpcMethod('Account', 'loginByToken')
  public async loginByToken(data: { token: string }) {
    return this.accountService.loginByToken(data.token);
  }
}
