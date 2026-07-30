import { Injectable } from '@nestjs/common';
import { QuestGrpcService } from '@app/grpc-api-clients/quest';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AttachQuestToUserHandler {


  public constructor(
    private readonly questGrpcService: QuestGrpcService
  ){}


  public async run(data: { userId: string, questId:string }){
    return firstValueFrom(this.questGrpcService.service.attachQuestToUser(data))
  }

}
