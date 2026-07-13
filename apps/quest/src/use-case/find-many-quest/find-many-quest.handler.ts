import { Injectable } from '@nestjs/common';
import { QuestAbstractRepository } from '../../infrastructure/repositories/quest';
import { IFindMany } from 'libs/interfaces';


@Injectable()
export class FindManyQuestHandler {

  public constructor(
    private readonly questRepository: QuestAbstractRepository
  ){}

  public async run(data: IFindMany){
    return this.questRepository.findMany(data);
  }

}
