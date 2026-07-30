import { Injectable } from '@nestjs/common';
import { QuestGrpcService } from '@app/grpc-api-clients/quest';
import { firstValueFrom } from 'rxjs';
import { IFindManyUserQuests } from 'libs/interfaces';


@Injectable()
export class FindManyUserQuestsHandler {

  public constructor(
    private readonly questGrpcService: QuestGrpcService
  ){}

  public async run(userId: string, data: IFindManyUserQuests){
    return (await firstValueFrom(this.questGrpcService.service.findManyUserQuests({
      userId,
      data: {
        questId: data.questId,
        status: data.status
      }
    }))).userQuests
  }
}
