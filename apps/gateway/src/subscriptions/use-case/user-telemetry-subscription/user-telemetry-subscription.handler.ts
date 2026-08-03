import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { IUpdateUserTelemetry, IUserTelemetry } from 'libs/interfaces';

@Injectable()
export class UserTelemetrySubscriptionHandler {
  private readonly logger: Logger = new Logger(UserTelemetrySubscriptionHandler.name);

  public constructor(
    @Inject('USER_TELEMETRY_KAFKA_SERVICE')
    private readonly userTelemetryKafkaService: ClientKafkaProxy,
  ) {}

  public async run(userId: string, data: Omit<IUpdateUserTelemetry, 'userId'>): Promise<void> {
    this.userTelemetryKafkaService.emit('user-telemetry-processor', {
      userId,
      ...data,
    });
  }
}
