import { Injectable } from '@nestjs/common';
import { IGetUser, IUpdateUserInputInterface } from 'libs/interfaces';
import { UpdateUserHandler } from '../use-case/update-user/update-user.handler';
import { GetUserFullHandler } from '../use-case/get-user-full/get-user-full.handler';
import { GetUserTelemetryHandler } from '../use-case/get-user-telemetry/get-user-telemetry.handler';
import { GetUserGamificationHandler } from '../use-case/get-user-gamification/get-user-gamification.handler';

@Injectable()
export class UserPresentationService {
  public constructor(
    private readonly updateUserHandler: UpdateUserHandler,
    private readonly getUserFullHandler: GetUserFullHandler,
    private readonly getUserTelemetryHandler: GetUserTelemetryHandler,
    private readonly getUserGamificationHandler: GetUserGamificationHandler,
  ) {}

  public async updateUser(input: IUpdateUserInputInterface) {
    return this.updateUserHandler.run(input);
  }

  public async getUserFull(data: IGetUser) {
    return this.getUserFullHandler.run(data);
  }

  public async getUserTelemetry(user: IGetUser, routeId: string) {
    return this.getUserTelemetryHandler.run(user, routeId);
  }

  public async getUserGamification(user: IGetUser) {
    return this.getUserGamificationHandler.run(user);
  }
}
