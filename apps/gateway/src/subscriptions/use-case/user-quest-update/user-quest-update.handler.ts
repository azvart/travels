import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { PubSub } from 'graphql-subscriptions';
import { IUserQuest } from 'libs/interfaces';


@Injectable()
export class UserQuestUpdateHandler implements OnModuleInit {
  private readonly kafka = new Kafka({
    clientId: 'quest-processor',
    brokers: ['localhost:9092'],
  });

  private readonly consumer = this.kafka.consumer({
    groupId: 'quest-processor',
  });

  public constructor(
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
  ) {}

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: 'user-quest-update',
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const payload = JSON.parse(message.value?.toString() as string) as IUserQuest;
        await this.pubSub.publish(`user-quest-sub-${payload.userId}`, {questSubscription:{
          questId: payload.questId,
          progress: payload.progress,
          finishResult: payload.finishResult,
          status: payload.status
        }});
      },
    });
  }
}
