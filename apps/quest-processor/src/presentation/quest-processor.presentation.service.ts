import { Injectable } from '@nestjs/common';
import { IUserQuest } from 'libs/interfaces';
import { UpdateUserQuestProgressHandler } from '../use-case/update-user-quest/update-user-quest-progress.handler';

@Injectable()
export class QuestProcessorPresentationService {
  public constructor(
    private readonly updateUserQuestProgressHandler: UpdateUserQuestProgressHandler,
  ) {}

  public questProcessor(message: IUserQuest) {
    return this.updateUserQuestProgressHandler.run(message);
  }
}
