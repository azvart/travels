import { Injectable } from '@nestjs/common';
import { QuestGrpcService } from '@app/grpc-api-clients/quest';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FindOneQuestHandler {
  public constructor(private readonly questGrpcService: QuestGrpcService) {}

  public async run(id: string) {
    return firstValueFrom(
      this.questGrpcService.service.findOne({
        id,
      }),
    );
  }
}
