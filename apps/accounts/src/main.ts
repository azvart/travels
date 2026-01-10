import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'node:path';

async function bootstrap() {
  const grpcPort = process.env.GRPC_PORT || '50052';
  const app = await NestFactory.create(AppModule);
  const protoPath = join(
    process.cwd(),
    'libs/proto/src/account',
    'account.proto',
  );

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'account',
      protoPath,
      url: `0.0.0.0:${grpcPort}`,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002);
  console.log(`Account service (gRPC) listening on ${grpcPort}`);
}
bootstrap();
