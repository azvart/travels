import { Injectable } from '@nestjs/common';
import { UserQuestAbstractRepository } from '../../infrastructure/repositories/user-quest';
import { UserQuestService } from '@app/redis';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AttachQuestToUserHandler {
  public constructor(
    private readonly userQuestRepository: UserQuestAbstractRepository,
    private readonly accountGrpcService: AccountGrpcService,
  ) {}

  public async run(data: { userId: string; questId: string | string[] }) {
    const attachedQuests = await this.userQuestRepository.attachQuestToUser(
      data.userId,
      data.questId,
    );
    await firstValueFrom(this.accountGrpcService.service.updateUserStatistic({
      userId: data.userId,
      data: {
        attachedQuests: 1
      }
    }))
    return attachedQuests;
  }
}
