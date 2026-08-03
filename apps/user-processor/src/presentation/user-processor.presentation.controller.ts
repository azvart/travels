import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserProcessorPresentationService } from './user-processor.presentation.service';
import { IUpdateUserTelemetry, IUserTelemetry } from 'libs/interfaces';


@Controller()
export class UserProcessorPresentationController {
  private logger: Logger = new Logger(UserProcessorPresentationController.name);


  public constructor(
    private readonly userProcessorPresentationService: UserProcessorPresentationService
  ){}


  @MessagePattern('user-telemetry-processor')
  public userTelemetryProcessor(@Payload() message: IUpdateUserTelemetry){
    this.logger.debug(this.userTelemetryProcessor.name, message);
    return this.userProcessorPresentationService.userTelemetryProcessor(message);
  }
}
