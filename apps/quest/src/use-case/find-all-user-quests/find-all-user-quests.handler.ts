import { Injectable } from '@nestjs/common';
import { UserQuestAbstractRepository } from '../../infrastructure/repositories/user-quest';

@Injectable()
export class FindAllUserQuestsHandler {
  public constructor(private readonly userQuestRepository: UserQuestAbstractRepository) {}

  public async run(userId?: string) {
    return {
      userQuests: await this.userQuestRepository.findAllUserQuests(userId),
    };
  }
}
