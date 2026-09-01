import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserProcessorModule } from './user-processor.module';
import { KafkaConsumersGroupsEnum } from 'libs/interfaces/kafka';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserProcessorModule, {
    transport: Transport.KAFKA,
    options: {
      postfixId: '',
      clientId: KafkaConsumersGroupsEnum.USER_PROCESSOR,
      brokers: ['localhost:9092'],
      consumer: {
        groupId: KafkaConsumersGroupsEnum.USER_PROCESSOR,
      },
    },
  });
  await app.listen();
}
bootstrap();
