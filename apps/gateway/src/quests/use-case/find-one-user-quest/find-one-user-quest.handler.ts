import { Injectable } from '@nestjs/common';
import { QuestGrpcService } from '@app/grpc-api-clients/quest';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FindOneUserQuestHandler {
  public constructor(private readonly questGrpcService: QuestGrpcService) {}

  public async run(userId: string, questId: string) {
    return firstValueFrom(
      this.questGrpcService.service.findOneUserQuest({
        userId,
        questId,
      }),
    );
  }
}
