import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { join } from 'node:path';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const awardsPort = configService.get<string>('AWARDS_PORT');
  const awardsGrpcHost = configService.get<string>('AWARDS_GRPC_HOST');
  const awardsGrpcPort = configService.get<string>('AWARDS_GRPC_PORT');
  const protoPath = join(process.cwd(), 'libs/proto/src/awards', 'awards.proto');

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'awards',
      protoPath,
      url: `${awardsGrpcHost}:${awardsGrpcPort}`,
    },
  });

  await app.startAllMicroservices();
  await app.listen(awardsPort as string);
  console.log(`Awards service (gRPC) listening on ${awardsGrpcHost}:${awardsGrpcPort}`);
}
void bootstrap();
