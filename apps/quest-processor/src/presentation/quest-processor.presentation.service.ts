import { Injectable } from '@nestjs/common';
import { IUserQuest } from 'libs/interfaces';
import { UpdateUserQuestProgressHandler } from '../use-case/update-user-quest/update-user-quest-progress.handler';
import { QuestStepsProgressHandler } from '../use-case/quest-steps-progress/quest-steps-progress.handler';
import { QuestDurationProgressHandler } from '../use-case/quest-duration-progress/quest-duration-progress.handler';
import { QuestRoutesProgressHandler } from '../use-case/quest-routes-progress/quest-routes-progress.handler';

@Injectable()
export class QuestProcessorPresentationService {
  public constructor(
    private readonly updateUserQuestProgressHandler: UpdateUserQuestProgressHandler,
    private readonly questStepsProgressHandler: QuestStepsProgressHandler,
    private readonly questDurationProgressHandler: QuestDurationProgressHandler,
    private readonly questRoutesProgressHandler: QuestRoutesProgressHandler
  ) {}

  public questProcessor(message: IUserQuest) {
    return this.updateUserQuestProgressHandler.run(message);
  }

  public questStepsProgress(message: {userId: string, steps: number}){
    return this.questStepsProgressHandler.run(message);
  }

  public questDurationProgress(message: {userId: string, duration: number}){
    return this.questDurationProgressHandler.run(message);
  }

  public questRoutesProgress(message: {userId: string, routes: number}){
    return this.questRoutesProgressHandler.run(message);
  }
}
