import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule, {
    logger: ['error', 'debug', 'warn' ,'verbose', 'fatal']
  });
  const configService = app.get(ConfigService);
  const port = configService.get<string>('GATEWAY_PORT');
  app.enableCors({
    origin: 'http://localhost:3030',
    credentials: true,
  });
  await app.listen(port as string);
}
bootstrap();
