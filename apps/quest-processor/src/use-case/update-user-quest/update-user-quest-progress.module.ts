import { Module } from '@nestjs/common';
import { UpdateUserQuestProgressHandler } from './update-user-quest-progress.handler';
import { RedisModule } from '@app/redis';
import { PubSubModule } from '@app/pubsub';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { KafkaConsumersGroupsEnum } from 'libs/interfaces/kafka';

@Module({
  imports: [
    RedisModule,
    PubSubModule,
    ClientsModule.register([
      {
        name: 'QUEST_PROGRESS_KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          postfixId: '',
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
    GrpcApiClientsModule,
  ],
  providers: [UpdateUserQuestProgressHandler],
  exports: [UpdateUserQuestProgressHandler],
})
export class UpdateUserQuestProgressModule {}
