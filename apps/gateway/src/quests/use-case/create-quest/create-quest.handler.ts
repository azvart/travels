import { Injectable } from '@nestjs/common';
import { QuestGrpcService } from '@app/grpc-api-clients/quest';
import { firstValueFrom } from 'rxjs';
import { ICreateQuest } from 'libs/interfaces';
@Injectable()
export class CreateQuestHandler {
  public constructor(private readonly questGrpcService: QuestGrpcService) {}

  public async run(data: ICreateQuest) {
    return firstValueFrom(this.questGrpcService.service.createQuest(data));
  }
}
