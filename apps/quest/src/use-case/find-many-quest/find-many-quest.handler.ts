import { Injectable } from '@nestjs/common';
import { QuestAbstractRepository } from '../../infrastructure/repositories/quest';
import { IFindManyQuests } from 'libs/interfaces';

@Injectable()
export class FindManyQuestHandler {
  public constructor(private readonly questRepository: QuestAbstractRepository) {}

  public async run(data: IFindManyQuests) {
    const quests = await this.questRepository.findMany(data);
    return {
      quests,
    };
  }
}
