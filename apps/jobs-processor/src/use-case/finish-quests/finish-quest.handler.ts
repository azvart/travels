import { Injectable, Logger } from '@nestjs/common';
import { UserQuestService } from '@app/redis';
import { QuestGrpcService } from '@app/grpc-api-clients/quest';
import { firstValueFrom } from 'rxjs';
import { IUserQuest } from 'libs/interfaces';
import { questStatus } from '@app/proto/generated/quest/quest';

@Injectable()
export class FinishQuestHandler {
  private readonly logger: Logger = new Logger(FinishQuestHandler.name);

  public constructor(
    private readonly userQuestRedisService: UserQuestService,
    private readonly questGrpcService: QuestGrpcService,
  ) {}

  public async run() {
    const userQuestEntity = (
      await firstValueFrom(this.questGrpcService.service.findAllUserQuests({}))
    ).userQuests.flatMap((item) => (item.status !== questStatus.FINISHED ? [item] : []));
    this.logger.debug('Entity from DB', userQuestEntity);

    const userQuestRedisData = (
      await Promise.all(
        userQuestEntity.map((item) =>
          this.userQuestRedisService.getAllUserQuests(item.userId, item.questId),
        ),
      )
    )
      .flatMap((item) => (item.status === questStatus.FINISHED ? [item] : []));
    this.logger.debug('data from redis', userQuestRedisData);

    await Promise.all(
      userQuestRedisData.map((item) =>
        firstValueFrom(
          this.questGrpcService.service.completeQuest({
            userId: item.userId,
            questId: item.questId,
          }),
        ),
      ),
    );
  }
}
