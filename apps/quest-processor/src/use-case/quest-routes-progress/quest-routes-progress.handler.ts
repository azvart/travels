import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserQuestService } from '@app/redis';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { IUserQuest } from 'libs/interfaces';
import { questField, questStatus } from '@app/proto/generated/quest/quest';
import { KafkaTopicsEnum } from 'libs/interfaces/kafka';

@Injectable()
export class QuestRoutesProgressHandler {
  private logger: Logger = new Logger(QuestRoutesProgressHandler.name);
  public constructor(
    private readonly userQuestService: UserQuestService,
    @Inject('USER_QUEST_SOCKET_UPDATE')
    private readonly userQuestSocketUpdate: ClientKafkaProxy,
  ) {}

  public async run(message: { userId: string; routes: number }) {
    const redisStringData = await this.userQuestService.getAllQuests(message.userId);

    for await (const data of redisStringData) {
      const currentProgress = data.progress + message.routes;
      if (data.questField === questField.ROUTES && data.status === questStatus.IN_PROGRESS) {
        if (currentProgress >= data.finishResult) {
          await this.userQuestService.updateQuest(data.userId, data.questId, {
            ...data,
            status: questStatus.FINISHED,
            progress: data.finishResult,
          });
        } else {
          await this.userQuestService.updateQuest(data.userId, data.questId, {
            ...data,
            progress: currentProgress,
          });
        }
      }
      const userQuestRedisData = await this.userQuestService.getAllUserQuests(
        data.userId,
        data.questId,
      );
      this.userQuestSocketUpdate.emit(KafkaTopicsEnum.USER_QUEST_SOCKET_UPDATE, userQuestRedisData);
    }
  }
}
