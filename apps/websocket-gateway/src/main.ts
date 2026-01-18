import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.WEBSOCKET_GATEWAY_PORT ?? 4000);
  console.log(await app.getUrl());
}
bootstrap();
