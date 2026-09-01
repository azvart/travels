import { Inject, Injectable } from '@nestjs/common';
import { IUpdateUserTelemetry } from 'libs/interfaces';
import { UserTelemetryService } from '@app/redis';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { KafkaTopicsEnum } from 'libs/interfaces/kafka';

@Injectable()
export class UpdateUserTelemetryHandler {
  public constructor(
    @Inject('USER_QUEST_KAFKA_SERVICE')
    private readonly userQuestProcessorKafkaService: ClientKafkaProxy,
    private readonly userTelemetryService: UserTelemetryService,
  ) {}

  public async run(message: IUpdateUserTelemetry) {
    await this.userTelemetryService.updateUserRouteTelemetry(
      message.userId,
      message.routeId,
      message,
    );
   this.userQuestProcessorKafkaService.emit(KafkaTopicsEnum.USER_QUEST_STEPS_PROGRESS, {
     userId: message.userId,
     steps: message.steps
   })
    this.userQuestProcessorKafkaService.emit(KafkaTopicsEnum.USER_QUEST_DURATION_PROGRESS, {
      userId: message.userId,
      duration: message.duration
    })
  }
}
