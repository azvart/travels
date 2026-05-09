import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'node:path';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const weatherPort = configService.get<string>('WEATHER_PORT');
  const weatherGrpcHost = configService.get<string>('WEATHER_GRPC_HOST');
  const weatherGrpcPort = configService.get<string>('WEATHER_GRPC_PORT');
  const protoPath = join(
    process.cwd(),
    'libs/proto/src/weather',
    'weather.proto',
  );

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'weather',
      protoPath,
      url: `${weatherGrpcHost}:${weatherGrpcPort}`,
    },
  });

  await app.startAllMicroservices();
  await app.listen(weatherPort as string, () => {
    console.log(
      `Weather service (gRPC) listening on ${weatherGrpcHost}:${weatherGrpcPort}`,
    );
  });
}
bootstrap();
