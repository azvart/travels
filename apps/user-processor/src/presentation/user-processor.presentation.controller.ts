import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserProcessorPresentationService } from './user-processor.presentation.service';
import { IUpdateUserTelemetry } from 'libs/interfaces';
import { KafkaTopicsEnum } from 'libs/interfaces/kafka';

@Controller()
export class UserProcessorPresentationController {
  private logger: Logger = new Logger(UserProcessorPresentationController.name);

  public constructor(
    private readonly userProcessorPresentationService: UserProcessorPresentationService,
  ) {}

  @MessagePattern(KafkaTopicsEnum.USER_TELEMETRY_UPDATE)
  public userTelemetryProcessor(@Payload() message: IUpdateUserTelemetry) {
    this.logger.debug(this.userTelemetryProcessor.name, message);
    return this.userProcessorPresentationService.userTelemetryProcessor(message);
  }
}
