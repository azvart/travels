import {  Injectable } from '@nestjs/common';
import { QuestGrpcService } from '@app/grpc-api-clients/quest';
import { IDeleteQuest } from 'libs/interfaces';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class DeleteOneQuestHandler {

  public constructor(
    private readonly questGrpcService: QuestGrpcService
  ){}

  public async run(data: IDeleteQuest){
    return firstValueFrom(this.questGrpcService.service.deleteOne(data))
  }
}
