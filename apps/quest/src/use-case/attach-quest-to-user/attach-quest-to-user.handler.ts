import { Injectable } from '@nestjs/common';
import { UserQuestAbstractRepository } from '../../infrastructure/repositories/user-quest';
import { UserQuestService } from '@app/redis';

@Injectable()
export class AttachQuestToUserHandler {
  public constructor(
    private readonly userQuestRepository: UserQuestAbstractRepository,
    private readonly userQuestRedisService: UserQuestService,
  ) {}

  public async run(data: { userId: string; questId: string | string[] }) {
    const attachedQuests = await this.userQuestRepository.attachQuestToUser(
      data.userId,
      data.questId,
    );

    if (Array.isArray(attachedQuests)) {
      await Promise.all(
        attachedQuests.map((quest) =>
          this.userQuestRedisService.startQuests(data.userId, quest.questId, quest),
        ),
      );
    } else {
      await this.userQuestRedisService.startQuests(
        data.userId,
        attachedQuests.questId,
        attachedQuests,
      );
    }

    return attachedQuests;
  }
}
