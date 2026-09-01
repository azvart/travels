import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { IUpdateUserTelemetry } from 'libs/interfaces';
import { KafkaTopicsEnum } from 'libs/interfaces/kafka';

@Injectable()
export class UserTelemetrySubscriptionHandler {
  private readonly logger: Logger = new Logger(UserTelemetrySubscriptionHandler.name);

  public constructor(
    @Inject('USER_TELEMETRY_KAFKA_SERVICE')
    private readonly userTelemetryKafkaService: ClientKafkaProxy,
  ) {}

  public async run(userId: string, data: Omit<IUpdateUserTelemetry, 'userId'>): Promise<void> {
    this.logger.log(`${this.run.name} ${data}`)
    this.userTelemetryKafkaService.emit(KafkaTopicsEnum.USER_TELEMETRY_UPDATE, {
      userId,
      ...data,
    });
  }
}
