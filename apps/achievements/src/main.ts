import { NestFactory } from '@nestjs/core';
import { join } from 'node:path';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const grpcPort = process.env.GRPC_PORT || '5054';
  const app = await NestFactory.create(AppModule);
  ///TODO work with proto
  const protoPath = join(
    process.cwd(),
    'libs/proto/src/achievements',
    'achievement.proto',
  );
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'achievement',
      protoPath,
      url: `0.0.0.0:${grpcPort}`,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3010);
  console.log(`Achievements service (gRPC) listening on ${grpcPort}`);
}
bootstrap();
