import { Injectable } from '@nestjs/common';
import { UserQuestAbstractRepository } from '../../infrastructure/repositories/user-quest';


@Injectable()
export class DeleteQuestsHandler {


  public constructor(
    private readonly userQuestRepository: UserQuestAbstractRepository
  ){}


  public async run(questId: string | string[]){
    return this.userQuestRepository.deleteQuests(questId)
  }

}
