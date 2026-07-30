import { Injectable } from '@nestjs/common';
import { QuestGrpcService } from '@app/grpc-api-clients/quest';
import { firstValueFrom } from 'rxjs';
import { IDeleteQuest } from 'libs/interfaces';


@Injectable()
export class DeleteManyQuestsHandler {
  public constructor(
    private readonly questGrpcService: QuestGrpcService
  ){}

  public async run(id: string[]) {
    return firstValueFrom(this.questGrpcService.service.deleteMany({
      id
    }))
  }
}
