import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'node:path';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const grpcPort = process.env.GRPC_PORT || '50053';
  const app = await NestFactory.create(AppModule);
  const protoPath = join(
    process.cwd(),
    'libs/proto/src/travels-card',
    'travels-card.proto',
  );

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'travelCards',
      protoPath,
      url: `0.0.0.0:${grpcPort}`,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3004);
  console.log(`TravelCards service (gRPC) listening on ${grpcPort}`);
}
bootstrap();
