import { Injectable } from '@nestjs/common';
import { IUpdateUserTelemetry, IUserTelemetry } from 'libs/interfaces';
import { UpdateUserTelemetryHandler } from '../use-case/update-user-telemetry/update-user-telemetry.handler';

@Injectable()
export class UserProcessorPresentationService {
  public constructor(private readonly updateUserTelemetryHandler: UpdateUserTelemetryHandler) {}

  public async userTelemetryProcessor(message: IUpdateUserTelemetry) {
    return this.updateUserTelemetryHandler.run(message);
  }
}
