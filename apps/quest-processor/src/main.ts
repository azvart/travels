import { NestFactory } from '@nestjs/core';
import { QuestProcessorModule } from './quest-processor.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(QuestProcessorModule, {
    transport: Transport.KAFKA,
    options: {
      clientId: 'quest-processor',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'quest-processor',
    },
  });
  await app.listen();
}
bootstrap();
