import { NestFactory } from '@nestjs/core';
import { WeatherProcessorModule } from './weather-processor.module';

async function bootstrap() {
  const app = await NestFactory.create(WeatherProcessorModule);
  await app.listen(process.env.port ?? 5001);
}
bootstrap();
