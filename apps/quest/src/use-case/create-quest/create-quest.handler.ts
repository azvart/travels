import { Injectable } from '@nestjs/common';
import { QuestAbstractRepository } from '../../infrastructure/repositories/quest';
import { ICreateQuest } from 'libs/interfaces';


@Injectable()
export class CreateQuestHandler {

  public constructor(
    private readonly questRepository: QuestAbstractRepository
  ){}


  public async run(data: ICreateQuest){
    return this.questRepository.create(data);
  }
}
