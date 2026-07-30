import { Inject, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { QUEST_SERVICE_NAME, QuestClient } from '@app/proto/generated/quest/quest';


@Injectable()
export class QuestGrpcService implements OnModuleInit {
  public constructor(@Inject('QUEST_GRPC_SERVICE') private readonly client: ClientGrpc) {}

  public service!: QuestClient;

  public logger: Logger = new Logger();

  onModuleInit() {
    this.service = this.client.getService<QuestClient>(QUEST_SERVICE_NAME);

    this.logger.log(
      `QuestGrpcService init and running on ${process.env.QUEST_GRPC_HOST}:${process.env.QUEST_GRPC_PORT}`
    )
  }
}
