import { NestFactory } from '@nestjs/core';
import { join } from 'node:path';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ///TODO work with proto
  const protoPath = join(
    process.cwd(),
    'libs/proto/src/achievements',
    'achievement.proto',
  );
  const configService = app.get(ConfigService);
  const achievementPort = configService.get<number>('ACHIEVEMENT_PORT');
  const achievementGrpcHost = configService.get<string>(
    'ACHIEVEMENT_GRPC_HOST',
  );
  const achievementGrpcPort = configService.get<number>(
    'ACHIEVEMENT_GRPC_PORT',
  );
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'achievement',
      protoPath,
      url: `${achievementGrpcHost}:${achievementGrpcPort}`,
    },
  });
  await app.startAllMicroservices();
  await app.listen(achievementPort as number);
  console.log(
    `Achievements service (gRPC) listening on ${achievementGrpcHost}:${achievementGrpcPort}`,
  );
}
bootstrap();
