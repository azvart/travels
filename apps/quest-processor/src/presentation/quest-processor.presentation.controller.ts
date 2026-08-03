import { Controller, Logger } from '@nestjs/common';
import { QuestProcessorPresentationService } from './quest-processor.presentation.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IUserQuest } from 'libs/interfaces';


@Controller()
export class QuestProcessorPresentationController {
  private logger: Logger = new Logger(QuestProcessorPresentationController.name);

  public constructor(
    private readonly questProcessorPresentationService: QuestProcessorPresentationService
  ){}


  @MessagePattern('quest-processor')
  public questProcessor(@Payload() message:IUserQuest){
    this.logger.debug(this.questProcessor.name, message);
    return this.questProcessorPresentationService.questProcessor(message);
  }
}
