import { Module } from '@nestjs/common';
import { UserQuestUpdateHandler } from './user-quest-update.handler';
import { PubSubModule } from '@app/pubsub';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConsumersGroupsEnum } from 'libs/interfaces/kafka';

@Module({
  imports: [
    PubSubModule,
    ClientsModule.register([
      {
        name: 'QUEST_UPDATE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          postfixId: '',
          clientId: KafkaConsumersGroupsEnum.QUEST_PROCESSOR,
          brokers: ['localhost:9092'],
          consumer: {
            groupId: KafkaConsumersGroupsEnum.QUEST_PROCESSOR
          }
        }
      },
    ]),
  ],
  providers: [UserQuestUpdateHandler],
  exports: [UserQuestUpdateHandler],
})
export class UserQuestUpdateModule {}
