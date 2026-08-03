import { Controller } from '@nestjs/common';
import { AccountPresentationService } from './account.presentation.service';
import { GrpcMethod } from '@nestjs/microservices';
import { ICreateNewAccount } from 'libs/interfaces/account/create-new-account.interface';
import {
  IGetUser,
  ILoginInput,
  IRefreshToken,
  IUpdateAccountInput,
  IUpdateUserInputInterface,
  IUpdateUserTelemetry,
} from 'libs/interfaces';

@Controller()
export class AccountPresentationController {
  public constructor(private readonly accountPresentationService: AccountPresentationService) {}

  @GrpcMethod('Account', 'createAccount')
  public async createAccount(data: ICreateNewAccount) {
    return this.accountPresentationService.createAccount(data);
  }

  @GrpcMethod('Account', 'updateAccount')
  public async updateAccount(data: IUpdateAccountInput) {
    return this.accountPresentationService.updateAccount(data);
  }

  @GrpcMethod('Account', 'deleteAccount')
  public async deleteAccount(data: { accountId: string }) {
    return this.accountPresentationService.deleteAccount(data);
  }

  @GrpcMethod('Account', 'login')
  public async login(data: ILoginInput) {
    return this.accountPresentationService.login(data);
  }

  @GrpcMethod('Account', 'refreshToken')
  public async refreshToken(data: IRefreshToken) {
    return this.accountPresentationService.refreshToken(data);
  }

  @GrpcMethod('Account', 'updateUser')
  public async updateUser(data: IUpdateUserInputInterface) {
    return this.accountPresentationService.updateUser(data);
  }

  @GrpcMethod('Account', 'getUser')
  public async getUser(data: IGetUser) {
    return this.accountPresentationService.getUser(data);
  }

  @GrpcMethod('Account', 'getUserTelemetry')
  public async getUserTelemetry(data: { userId: string; routeId: string }) {
    return this.accountPresentationService.getUserTelemetry(data);
  }

  @GrpcMethod('Account', 'getUserGamification')
  public async getUserGamification(data: IGetUser) {
    return this.accountPresentationService.getUserGamification(data.userId);
  }

  @GrpcMethod('Account', 'updateUserTelemetry')
  public async updateUserTelemetry(data: IUpdateUserTelemetry) {
    return this.accountPresentationService.updateUserTelemetry(data);
  }

  @GrpcMethod('Account', 'createUserTelemetry')
  public async createUserTelemetry(data: { userId: string; routeId: string }) {
    return this.accountPresentationService.createUserTelemetry(data);
  }
}
