import { Injectable } from '@nestjs/common';
import { QuestAbstractRepository } from '../../infrastructure/repositories/quest';


@Injectable()
export class DeleteManyQuestHandler {

  public constructor(
    private readonly questRepository: QuestAbstractRepository
  ){}


  public async run(questsIds: string[]){
    return this.questRepository.deleteMany(questsIds);
  }

}
