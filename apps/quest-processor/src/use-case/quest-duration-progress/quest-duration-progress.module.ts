import { Module } from '@nestjs/common';
import { QuestDurationProgressHandler } from './quest-duration-progress.handler';
import { RedisModule } from '@app/redis';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConsumersGroupsEnum } from 'libs/interfaces/kafka';


@Module({
  imports: [
    RedisModule,
    ClientsModule.register([
      {
        name: 'USER_QUEST_SOCKET_UPDATE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: KafkaConsumersGroupsEnum.QUEST_PROCESSOR,
            brokers: ['localhost:9092'],
            consumer: {
              groupId: KafkaConsumersGroupsEnum.QUEST_PROCESSOR,
            },
          },
        },
      },
    ]),
  ],
  providers: [QuestDurationProgressHandler],
  exports: [QuestDurationProgressHandler],
})
export class QuestDurationProgressModule {}
