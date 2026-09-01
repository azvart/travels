import { Module } from '@nestjs/common';
import { QuestStepsProgressHandler } from './quest-steps-progress.handler';
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
              groupId: KafkaConsumersGroupsEnum.QUEST_PROCESSOR
            }
          }
        }
      },
    ]),
  ],
  providers: [QuestStepsProgressHandler],
  exports: [QuestStepsProgressHandler],
})
export class QuestStepsProgressModule {}
