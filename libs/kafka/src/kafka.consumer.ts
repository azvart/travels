import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaJS } from '@confluentinc/kafka-javascript';
import { ConsumerRegistry } from '@app/kafka/registry';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private kafka = new KafkaJS.Kafka({
    kafkaJS: {
      brokers: ['localhost:9092'],
    },
  });
  private consumer = this.kafka.consumer({ 'group.id': 'event.processor' });

  constructor(private readonly registry: ConsumerRegistry) {}

  async onModuleInit(): Promise<void> {
    await this.consumer.connect();
    for (const topic of this.registry.getTopics()) {
      await this.consumer.subscribe({ topic, replace: false });
    }

    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        if (!message.value) return;
        const payload = JSON.parse(message.value.toString());
        const handlers = this.registry.getHandlers(topic);
        for (const { instance, methodName } of handlers) {
          await instance[methodName](payload);
        }
      },
    });
  }
}
