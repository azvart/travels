import { Injectable } from '@nestjs/common';
import { UserQuestAbstractRepository } from '../../infrastructure/repositories/user-quest';
import { IFindManyUserQuests, IUpdateUserQuest } from 'libs/interfaces';


@Injectable()
export class FindManyUserQuestsHandler {

  public constructor(
    private readonly userQuestRepository: UserQuestAbstractRepository
  ){}


  public async run(userQuestId:string, data: IFindManyUserQuests){
    const userQuests = await  this.userQuestRepository.findManyUserQuests(userQuestId, data);

    return {
      userQuests
    }
  }

}
