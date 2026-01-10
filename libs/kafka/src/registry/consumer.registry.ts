import { Injectable } from '@nestjs/common';
import 'reflect-metadata';
import { KAFKA_CONSUMER_METADATA } from '../decorators/kafka-consumer.decorator';

@Injectable()
export class ConsumerRegistry {
  private handlers = new Map<string, { instance: any; methodName: string }[]>();

  register(instance: any) {
    const metadata =
      Reflect.getMetadata(KAFKA_CONSUMER_METADATA, instance.constructor) || [];
    for (const { topic, methodName } of metadata) {
      if (!this.handlers.has(topic)) this.handlers.set(topic, []);
      this.handlers.get(topic)!.push({ instance, methodName });
    }
  }

  getHandlers(topic: string) {
    return this.handlers.get(topic) ?? [];
  }

  getTopics(): string[] {
    return Array.from(this.handlers.keys());
  }
}
