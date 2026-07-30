import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUserQuest, QuestStatusEnum } from 'libs/interfaces';
import { UserQuestService } from '@app/redis';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { QuestGrpcService } from '@app/grpc-api-clients/quest';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UpdateUserQuestProgressHandler {
  private readonly logger: Logger = new Logger(UpdateUserQuestProgressHandler.name);

  public constructor(
    @Inject('QUEST_PROGRESS_KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafkaProxy,
    private readonly userQuestService: UserQuestService,
    private readonly questGrpcService: QuestGrpcService,
  ) {}

  public async run(payload: IUserQuest) {
    const updatedMessage: IUserQuest = {
      ...payload,
      progress: payload.progress + 1,
      finishResult: 100,
    };
    if (
      payload.progress === payload.finishResult ||
      payload.status !== QuestStatusEnum.IN_PROGRESS
    ) {
      this.logger.debug(`QuestId ${payload.questId} is Finished`);
      const finishedStatusQuest = {
        ...payload,
        status: QuestStatusEnum.FINISHED,
      };
      await this.userQuestService.updateQuest(
        updatedMessage.userId,
        updatedMessage.questId,
        finishedStatusQuest,
      );
      await firstValueFrom(this.questGrpcService.service.completeQuest({
        questId: payload.questId,
        userId: payload.userId
      }));

      this.kafkaClient.emit('user-quest-update', {
        userId: finishedStatusQuest.userId,
        questId: finishedStatusQuest.questId,
        progress: finishedStatusQuest.progress,
        status: finishedStatusQuest.status,
        finishResult: finishedStatusQuest.finishResult,
      });
      return;
    }
    this.logger.debug(updatedMessage);
    await this.userQuestService.updateQuest(
      updatedMessage.userId,
      updatedMessage.questId,
      updatedMessage,
    );
    this.kafkaClient.emit('user-quest-update', {
      userId: updatedMessage.userId,
      questId: updatedMessage.questId,
      progress: updatedMessage.progress,
      status: updatedMessage.status,
      finishResult: updatedMessage.finishResult,
    });
  }
}
