import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const accountPort = configService.get<string>('ACCOUNTS_PORT');
  const accountGrpcHost = configService.get<string>('ACCOUNTS_GRPC_HOST');
  const accountGrpcPort = configService.get<string>('ACCOUNTS_GRPC_PORT');
  const protoPath = join(process.cwd(), 'libs/proto/src/account', 'account.proto');

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'account',
      protoPath,
      url: `${accountGrpcHost}:${accountGrpcPort}`,
    },
  });

  await app.startAllMicroservices();
  await app.listen(accountPort as string);
  console.log(`Account service (gRPC) listening on ${accountGrpcHost}:${accountGrpcPort}`);
}
void bootstrap();
