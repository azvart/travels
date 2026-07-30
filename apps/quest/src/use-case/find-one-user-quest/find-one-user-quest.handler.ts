import { Injectable } from '@nestjs/common';
import { UserQuestAbstractRepository } from '../../infrastructure/repositories/user-quest';


@Injectable()
export class FindOneUserQuestHandler {


  public constructor(
    private readonly userQuestRepository: UserQuestAbstractRepository
  ){}


  public async run(userId: string, questId: string){
    return this.userQuestRepository.findOneUserQuest(userId, questId)
  }

}
