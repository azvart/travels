import { Injectable } from '@nestjs/common';
import { UserAbstractRepository } from '../../infrastructure/user';

@Injectable()
export class CreateUserTelemetryHandler {
  public constructor(private readonly userRepository: UserAbstractRepository) {}

  public async run(data: { userId: string; routeId: string }) {
    return this.userRepository.createUserTelemetry(data.userId, data.routeId);
  }
}
