import { NestFactory } from '@nestjs/core';
import { QuestModule } from './quest.module';
import { ConfigService } from '@nestjs/config';
import { join } from 'node:path';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(QuestModule);
  const configService = app.get(ConfigService);
  const questPort = configService.get<string>("QUEST_PORT");
  const questGrpcHost = configService.get<string>('QUEST_GRPC_HOST');
  const questGrpcPort = configService.get<string>('QUEST_GRPC_PORT');

  const protoPath = join(
    process.cwd(),
    "libs/proto/src/quest",
    "quest.proto"
  )

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'quest',
      protoPath,
      url: `${questGrpcHost}:${questGrpcPort}`
    }
  })

  await app.startAllMicroservices();

  await app.listen(questPort as string);

  console.log(`Quest service (gRPC) listening on ${questGrpcHost}:${questGrpcPort}`);
}
bootstrap();
