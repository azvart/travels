import { Injectable } from '@nestjs/common';
import { UserQuestAbstractRepository } from '../../infrastructure/repositories/user-quest';
import { IUpdateUserQuest } from 'libs/interfaces';

@Injectable()
export class UpdateUserQuestsHandler {
  public constructor(private readonly userQuestRepository: UserQuestAbstractRepository) {}

  public async run(userQuestId: string, data: IUpdateUserQuest) {
    return this.userQuestRepository.updateQuests(userQuestId, data);
  }
}
