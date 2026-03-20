import { Module } from '@nestjs/common';
import { WeatherProcessorController } from './controllers/weather-processor.controller';
import { WeatherProcessorService } from './services/weather-processor.service';

@Module({
  controllers: [WeatherProcessorController],
  providers: [WeatherProcessorService],
})
export class AppModule {}
