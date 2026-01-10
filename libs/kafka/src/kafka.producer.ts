import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaJS } from '@confluentinc/kafka-javascript';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private kafka = new KafkaJS.Kafka({
    kafkaJS: {
      brokers: ['localhost:9092'],
    },
  });
  private producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async publish(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
