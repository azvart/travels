import { Injectable } from '@nestjs/common';
import { UserQuestAbstractRepository } from '../../infrastructure/repositories/user-quest';

@Injectable()
export class CompleteQuestsHandler {
  public constructor(private readonly userQuestRepository: UserQuestAbstractRepository) {}

  public async run(data: { userId: string; questId: string | string[] }) {
    return this.userQuestRepository.completeQuest(data.userId, data.questId);
  }
}
