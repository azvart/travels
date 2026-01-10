import { Module, Global } from '@nestjs/common';
import { KafkaProducerService } from './kafka.producer';
import { KafkaConsumerService } from './kafka.consumer';
import { ConsumerRegistry } from './registry/consumer.registry';
import { DiscoveryModule } from '@nestjs/core';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [KafkaProducerService, KafkaConsumerService, ConsumerRegistry],
  exports: [KafkaProducerService, ConsumerRegistry],
})
export class KafkaModule {}
