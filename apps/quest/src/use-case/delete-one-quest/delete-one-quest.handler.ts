import { Injectable } from '@nestjs/common';
import { QuestAbstractRepository } from '../../infrastructure/repositories/quest';


@Injectable()
export class DeleteOneQuestHandler {

  public constructor(
    private readonly questRepository: QuestAbstractRepository
  ){}

  public async run(questId: string){
    return this.questRepository.deleteOne(questId);
  }
}
