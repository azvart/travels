import { Controller, Logger } from '@nestjs/common';
import { QuestProcessorPresentationService } from './quest-processor.presentation.service';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { IUserQuest } from 'libs/interfaces';
import { KafkaTopicsEnum } from 'libs/interfaces/kafka';

@Controller()
export class QuestProcessorPresentationController {
  private logger: Logger = new Logger(QuestProcessorPresentationController.name);

  public constructor(
    private readonly questProcessorPresentationService: QuestProcessorPresentationService,
  ) {}

  @MessagePattern(KafkaTopicsEnum.USER_QUEST_PROGRESS)
  public questProcessor(@Payload() message: IUserQuest) {
    this.logger.debug(this.questProcessor.name, message);
    return this.questProcessorPresentationService.questProcessor(message);
  }
  @MessagePattern(KafkaTopicsEnum.USER_QUEST_STEPS_PROGRESS)
  public questStepsProgress(@Payload() message: { userId: string, steps: number }){
    return this.questProcessorPresentationService.questStepsProgress(message);
  }

  @MessagePattern(KafkaTopicsEnum.USER_QUEST_DURATION_PROGRESS)
  public questDurationProgress(@Payload() message: {userId: string, duration: number}){
    return this.questProcessorPresentationService.questDurationProgress(message);
  }

  @MessagePattern(KafkaTopicsEnum.USER_QUEST_ROUTES_PROGRESS)
  public questRoutesProgress(@Payload() message: { userId: string, routes: number }){
    return this.questProcessorPresentationService.questRoutesProgress(message);
  }
}
