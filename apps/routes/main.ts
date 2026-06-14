import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { ConfigService } from '@nestjs/config';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const routePort = configService.get<string>('ROUTE_PORT');
  const routeGrpcHost = configService.get<string>('ROUTE_GRPC_HOST');
  const routeGrpcPort = configService.get<string>('ROUTE_GRPC_PORT');

  const protoPath = join(

    process.cwd(),
    'libs/proto/src/route',
    'route.proto'
  )
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'route',
     protoPath,
      url: `${routeGrpcHost}: ${routeGrpcPort}`,
    }
  })

  await app.startAllMicroservices();
 await app.listen(routePort as string);
 console.log(
   `Route service (gRPC) listening on ${routeGrpcHost}:${routeGrpcPort}`,
 );
}

bootstrap();
