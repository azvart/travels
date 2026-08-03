import { Injectable } from '@nestjs/common';
import { QuestAbstractRepository } from '../../infrastructure/repositories/quest';
import { IUpdateQuest } from 'libs/interfaces';

@Injectable()
export class UpdateQuestHandler {
  public constructor(private readonly questRepository: QuestAbstractRepository) {}

  public async run(questId: string, data: Omit<IUpdateQuest, 'id'>) {
    return this.questRepository.updateOne(questId, data);
  }
}
