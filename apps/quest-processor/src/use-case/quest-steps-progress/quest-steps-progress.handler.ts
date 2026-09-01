import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserQuestService } from '@app/redis';
import { IUserQuest } from 'libs/interfaces';
import { questField, questStatus } from '@app/proto/generated/quest/quest';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { KafkaTopicsEnum } from 'libs/interfaces/kafka';

@Injectable()
export class QuestStepsProgressHandler {

  private readonly logger: Logger = new Logger(QuestStepsProgressHandler.name);

  public constructor(
    private readonly userQuestService: UserQuestService,
    @Inject('USER_QUEST_SOCKET_UPDATE')
    private readonly userQuestSocketUpdate: ClientKafkaProxy
    ) {}

  public async run(message: { userId: string; steps: number }) {
    this.logger.log(message)
    const redisStringData = await this.userQuestService.getAllQuests(message.userId);

    for await (const data of redisStringData) {
      const currentProgress = data.progress + message.steps;
      if (data.questField === questField.STEPS && data.status === questStatus.IN_PROGRESS) {
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
