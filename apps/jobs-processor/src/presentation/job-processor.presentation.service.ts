import { Injectable } from '@nestjs/common';
import { QuestProgressHandler } from '../use-case/quest-progress/quest-progress.handler';
import { FinishedQuestHandler } from '../use-case/finished-quest/finished-quest.handler';


@Injectable()
export class JobProcessorPresentationService {


  public constructor(
    private readonly questProgressHandler: QuestProgressHandler,
  ){}

  public async questProgress(){
    return this.questProgressHandler.run();
  }

}
