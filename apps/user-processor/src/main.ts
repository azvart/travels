import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { UserProcessorModule } from './user-processor.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserProcessorModule, {
    transport: Transport.KAFKA,
    options: {
      clientId: 'user-processor',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'user-processor',
    },
  });
  await app.listen();
}
bootstrap();
