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
  IUpdateUserTelemetry,
  IUserTelemetry,
} from 'libs/interfaces';
import { GetUserTelemetryHandler } from '../use-case/get-user-telemetry/get-user-telemetry.handler';
import { GetUserGamificationHandler } from '../use-case/get-user-gamification/get-user-gamification.handler';
import { UpdateUserTelemetryHandler } from '../use-case/update-user-telemetry/update-user-telemetry.handler';
import { CreateUserTelemetryHandler } from '../use-case/create-user-telemetry/create-user-telemetry.handler';
import { CreateUserStatisticHandler } from '../use-case/create-user-statistic/create-user-statistic.handler';
import { UpdateUserStatisticHandler } from '../use-case/update-user-statistic/update-user-statistic.handler';
import { FindOneUserStatisticHandler } from '../use-case/find-one-user-statistic/find-one-user-statistic.handler';
import { FindManyUserStatisticHandler } from '../use-case/find-many-user-statistic/find-many-user-statistic.handler';
import { IUpdateUserStatistic } from 'libs/interfaces/user-statistic';

@Injectable()
export class AccountPresentationService {
  public constructor(
    private readonly createAccountHandler: CreateAccountHandler,
    private readonly updateAccountHandler: UpdateAccountHandler,
    private readonly deleteAccountHandler: DeleteAccountHandler,
    private readonly loginHandler: LoginHandler,
    private readonly refreshTokenHandler: RefreshTokenHandler,
    private readonly updateUserHandler: UpdateUserHandler,
    private readonly getUserHandler: GetUserHandler,
    private readonly getUserTelemetryHandler: GetUserTelemetryHandler,
    private readonly getUserGamificationHandler: GetUserGamificationHandler,
    private readonly updateUserTelemetryHandler: UpdateUserTelemetryHandler,
    private readonly createUserTelemetryHandler: CreateUserTelemetryHandler,
    private readonly createUserStatisticHandler: CreateUserStatisticHandler,
    private readonly updateUserStatisticHandler: UpdateUserStatisticHandler,
    private readonly findOneUserStatisticHandler: FindOneUserStatisticHandler,
    private readonly findManyUserStatisticHandler: FindManyUserStatisticHandler
  ) {}

  public async createAccount(data: ICreateNewAccount) {
    return this.createAccountHandler.run(data);
  }

  public async updateAccount(data: IUpdateAccountInput) {
    const accountObj: Omit<IUpdateAccountInput, 'id'> = {
      email: data.email,
      password: data.password,
    };
    return this.updateAccountHandler.run(data.id, accountObj);
  }

  public async deleteAccount(data: { accountId: string }) {
    return this.deleteAccountHandler.run(data);
  }

  public async login(data: ILoginInput) {
    return this.loginHandler.run(data);
  }

  public async refreshToken(data: IRefreshToken) {
    return this.refreshTokenHandler.run(data.refreshToken);
  }

  public async updateUser(data: IUpdateUserInputInterface) {
    const userObj: Omit<IUpdateUserInputInterface, 'id'> = {
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      city: data.city,
      country: data.country,
      countryCode: data.countryCode,
      street: data.street,
    };
    return this.updateUserHandler.run(data.id, userObj);
  }

  public async getUser(data: IGetUser) {
    return this.getUserHandler.run(data);
  }

  public async getUserTelemetry(data: { userId: string; routeId: string }) {
    return this.getUserTelemetryHandler.run(data);
  }

  public async getUserGamification(userId: string) {
    return this.getUserGamificationHandler.run(userId);
  }

  public async updateUserTelemetry(data: IUpdateUserTelemetry) {
    return this.updateUserTelemetryHandler.run(data);
  }

  public async createUserTelemetry(data: { userId: string; routeId: string }) {
    return this.createUserTelemetryHandler.run(data);
  }

  public async createUserStatistic(userId: string){
    return this.createUserStatisticHandler.run(userId);
  }

  public async updateUserStatistic(userId: string, data: IUpdateUserStatistic){
    return this.updateUserStatisticHandler.run(userId, data);
  }

  public async findOneUserStatistic(userId: string){
    return this.findOneUserStatisticHandler.run(userId);
  }

  public async findManyUserStatistic(){
    return this.findManyUserStatisticHandler.run();
  }
}
