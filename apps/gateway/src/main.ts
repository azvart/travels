import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
// import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('GATEWAY_PORT');
  // app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3030',
    credentials: true,
  });
  await app.listen(port as string);
}
bootstrap();
