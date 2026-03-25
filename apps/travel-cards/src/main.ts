import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'node:path';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const travelCardsPort = configService.get<number>('TRAVEL_CARDS_PORT');
  const travelCardsGrpcHost = configService.get<string>(
    'TRAVEL_CARDS_GRPC_HOST',
  );
  const travelCardsGrpcPort = configService.get<number>(
    'TRAVEL_CARDS_GRPC_PORT',
  );

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
      url: `${travelCardsGrpcHost}:${travelCardsGrpcPort}`,
    },
  });

  await app.startAllMicroservices();
  await app.listen(travelCardsPort as number);
  console.log(
    `TravelCards service (gRPC) listening on ${travelCardsGrpcHost}:${travelCardsGrpcPort}`,
  );
}
bootstrap();
