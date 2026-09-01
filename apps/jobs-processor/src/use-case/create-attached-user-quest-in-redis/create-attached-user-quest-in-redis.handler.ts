import { Injectable, Logger } from '@nestjs/common';
import { UserQuestService } from '@app/redis';
import { firstValueFrom } from 'rxjs';
import { QuestGrpcService } from '@app/grpc-api-clients/quest';
import { IUserQuest } from 'libs/interfaces';
import { questStatus } from '@app/proto/generated/quest/quest';

@Injectable()
export class CreateAttachedUserQuestInRedisHandler {
  private readonly logger: Logger = new Logger(CreateAttachedUserQuestInRedisHandler.name);

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
    );
    this.logger.debug('data from redis', userQuestRedisData);
    const dataSaveToRedis = userQuestEntity.filter(
      (item) => !userQuestRedisData.some((entity) => entity.userId === item.userId),
    );
    this.logger.debug('data to save', dataSaveToRedis);
    await Promise.all(
      dataSaveToRedis.map(
        async (item) =>
          await this.userQuestRedisService.startQuests(item.userId, item.questId, item as any),
      ),
    );
  }
}
