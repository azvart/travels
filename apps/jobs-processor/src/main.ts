import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  const jobProcessorPort = configService.get<number>('JOB_PROCESSOR_PORT');

  await app.listen(jobProcessorPort as number);
}

bootstrap();
