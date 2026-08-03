import { Injectable } from '@nestjs/common';
import { QuestGrpcService } from '@app/grpc-api-clients/quest';
import { IUpdateQuest } from 'libs/interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UpdateQuestHandler {
  public constructor(private readonly questGrpcService: QuestGrpcService) {}

  public async run(data: IUpdateQuest) {
    return firstValueFrom(this.questGrpcService.service.updateQuest(data));
  }
}
