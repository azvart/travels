import { Injectable } from '@nestjs/common';
import { QuestGrpcService } from '@app/grpc-api-clients/quest';
import { IFindManyQuests } from 'libs/interfaces';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class FindManyQuestsHandler {
  public constructor(private readonly questGrpcService: QuestGrpcService) {}

  public async run(data: IFindManyQuests) {
    return (await firstValueFrom(this.questGrpcService.service.findMany(data))).quests
  }
}
