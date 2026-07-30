import { Injectable } from '@nestjs/common';
import { QuestGrpcService } from '@app/grpc-api-clients/quest';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class FindManyAttachedQuestToUserHandler {

  public constructor(
    private readonly userQuestGrpcService: QuestGrpcService
  ){}

  public async run(questId: string, userId: string){
    return !!(await firstValueFrom(this.userQuestGrpcService.service.findManyUserQuests({
      userId,
      data: {
        questId
      }
    }))).userQuests
  }

}
