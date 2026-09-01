import { Inject, Injectable } from '@nestjs/common';
import { UserQuestService } from '@app/redis';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { IUserQuest } from 'libs/interfaces';
import { questField, questStatus } from '@app/proto/generated/quest/quest';
import { KafkaTopicsEnum } from 'libs/interfaces/kafka';

@Injectable()
export class QuestDurationProgressHandler {
  public constructor(
    private readonly userQuestService: UserQuestService,
    @Inject('USER_QUEST_SOCKET_UPDATE')
    private readonly userQuestSocketUpdate: ClientKafkaProxy,
  ) {}

  public async run(message: { userId: string; duration: number }) {
    const redisStringData = await this.userQuestService.getAllQuests(message.userId);

    for await (const data of redisStringData) {
      const currentProgress = data.progress + message.duration;
      if (data.questField === questField.DURATION && data.status === questStatus.IN_PROGRESS) {
        if (currentProgress >= data.finishResult) {
          await this.userQuestService.updateQuest(data.userId, data.questId, {
            ...data,
            status: questStatus.FINISHED,
            progress: data.finishResult,
          });
        } else {
          await this.userQuestService.updateQuest(data.userId, data.questId, {
            ...data,
            progress: data.progress + message.duration,
          });
        }
      }
      const userQuestRedisData = await this.userQuestService.getAllUserQuests(
        data.userId,
        data.questId,
      );
        this.userQuestSocketUpdate.emit(
          KafkaTopicsEnum.USER_QUEST_SOCKET_UPDATE,
          userQuestRedisData,
        );

    }
  }
}
