import { Module } from '@nestjs/common';
import { QuestProgressAction } from './quest-progress.action';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
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
  ],
  providers: [QuestProgressAction],
  exports: [QuestProgressAction],
})
export class QuestProgressActionModule {}
