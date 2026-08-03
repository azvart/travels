import { Injectable } from '@nestjs/common';
import { IUpdateUserTelemetry, IUserTelemetry } from 'libs/interfaces';
import { UserAbstractRepository } from '../../infrastructure/user';

@Injectable()
export class UpdateUserTelemetryHandler {
  public constructor(private readonly userRepository: UserAbstractRepository) {}

  public async run(data: IUpdateUserTelemetry) {
    return this.userRepository.updateUserTelemetry(data);
  }
}
