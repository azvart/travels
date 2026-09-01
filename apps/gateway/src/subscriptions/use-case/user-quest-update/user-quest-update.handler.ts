import { Inject, Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { PubSub } from 'graphql-subscriptions';
import { IUserQuest } from 'libs/interfaces';
import { KafkaConsumersGroupsEnum, KafkaTopicsEnum } from 'libs/interfaces/kafka';
import { ClientKafkaProxy } from '@nestjs/microservices';

@Injectable()
export class UserQuestUpdateHandler implements OnApplicationBootstrap{

  private readonly kafka = new Kafka({
    clientId: 'quest-processor',
    brokers: (process.env.KAFKA_BROKERS ?? 'localhost:9092').split(','),
  });

  private readonly consumer = this.kafka.consumer({
    groupId: KafkaConsumersGroupsEnum.QUEST_PROCESSOR,
  });

  public constructor(
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
  ) {}

  async onApplicationBootstrap() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: KafkaTopicsEnum.USER_QUEST_SOCKET_UPDATE,
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const payload = JSON.parse(message.value?.toString() as string) as IUserQuest;
        await this.pubSub.publish(`user-quest-sub-${payload.userId}`, {
          questSubscription: {
            questId: payload.questId,
            progress: payload.progress,
            finishResult: payload.finishResult,
            status: payload.status,
          },
        });
      },
    });
  }
}
