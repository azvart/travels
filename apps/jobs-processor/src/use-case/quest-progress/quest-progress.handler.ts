import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QuestGrpcService } from '@app/grpc-api-clients/quest';
import { firstValueFrom } from 'rxjs';
import { JobsEnum } from '../../presentation/interfaces';
import { QuestStatusEnum } from 'libs/interfaces';


@Injectable()
export class QuestProgressHandler {

  private readonly logger:Logger = new Logger(QuestProgressHandler.name);

  public constructor(
    @InjectQueue('jobs')
    private readonly queue: Queue,
    private readonly questGrpcService: QuestGrpcService
  ) {}

  public async run() {
    const data = (await firstValueFrom(this.questGrpcService.service.findAllUserQuests({}))).userQuests
    return data.map((item) => item.status === QuestStatusEnum.IN_PROGRESS ? this.queue.add(JobsEnum.QUEST_PROGRESS, {
      userId: item.userId
    }, {
      jobId: `${JobsEnum.QUEST_PROGRESS}-${item.userId}`,
      removeOnComplete: true,
      attempts: 1,
    }) : null)
  }
}
