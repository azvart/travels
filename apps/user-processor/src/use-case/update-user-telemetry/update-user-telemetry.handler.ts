import { Injectable } from '@nestjs/common';
import { IUpdateUserTelemetry, IUserTelemetry } from 'libs/interfaces';
import { UserTelemetryService } from '@app/redis';


@Injectable()
export class UpdateUserTelemetryHandler {

  public constructor(
    private readonly userTelemetryService: UserTelemetryService
  ){}

  public async run(
    message:IUpdateUserTelemetry
  ) {
      await this.userTelemetryService.updateUserRouteTelemetry(message.userId, message.routeId, message);
  }
}
