import { Injectable } from '@nestjs/common';
import { QuestAbstractRepository } from '../../infrastructure/repositories/quest';

@Injectable()
export class FindOneQuestHandler {
  public constructor(private readonly questRepository: QuestAbstractRepository) {}

  public async run(questId: string) {
    return this.questRepository.findOne(questId);
  }
}
