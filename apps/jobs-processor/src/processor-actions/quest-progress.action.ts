import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserQuestService } from '@app/redis';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { IUserQuest } from 'libs/interfaces';


@Injectable()
export class QuestProgressAction {
  private readonly logger: Logger = new Logger(QuestProgressAction.name);

  public constructor(
    @Inject('QUEST_PROGRESS_KAFKA_SERVICE')
    private readonly questProgressKafkaService: ClientKafkaProxy,
    private readonly userQuestService: UserQuestService,
  ) {}

  public async run(payload: { userId: string }) {
    this.logger.debug(payload);
    const data = await this.userQuestService.getAllQuests(payload.userId);
    const values = Object.values(data);
    const parsedData = values.map((item) => JSON.parse(item)) as IUserQuest[];
    parsedData.map((item) => this.questProgressKafkaService.emit('quest-processor', item));
  }
}
