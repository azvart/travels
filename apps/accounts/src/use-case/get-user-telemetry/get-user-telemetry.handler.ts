import { Injectable } from '@nestjs/common';
import { UserAbstractRepository } from '../../infrastructure/user';

@Injectable()
export class GetUserTelemetryHandler {
  public constructor(private readonly userRepository: UserAbstractRepository) {}

  public async run(data: { userId: string; routeId: string }) {
    return this.userRepository.getUserTelemetry(data.userId, data.routeId);
  }
}
