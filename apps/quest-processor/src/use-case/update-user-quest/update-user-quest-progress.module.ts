import { Module } from '@nestjs/common';
import { UpdateUserQuestProgressHandler } from './update-user-quest-progress.handler';
import { RedisModule } from '@app/redis';
import { PubSubModule } from '@app/pubsub';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';

@Module({
  imports: [
    RedisModule,
    PubSubModule,
    ClientsModule.register([
      {
        name: 'QUEST_PROGRESS_KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'quest-processor',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'quest-processor',
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
