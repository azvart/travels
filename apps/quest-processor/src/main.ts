import { NestFactory } from '@nestjs/core';
import { QuestProcessorModule } from './quest-processor.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KafkaConsumersGroupsEnum } from 'libs/interfaces/kafka';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(QuestProcessorModule, {
    transport: Transport.KAFKA,
    options: {
      postfixId: '',
      clientId: KafkaConsumersGroupsEnum.QUEST_PROCESSOR,
      brokers: ['localhost:9092'],
      consumer: {
        groupId: KafkaConsumersGroupsEnum.QUEST_PROCESSOR,
      },
    },
  });
  await app.listen();
}
bootstrap();
