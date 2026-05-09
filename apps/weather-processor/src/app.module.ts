import { Module } from '@nestjs/common';
import { WeatherProcessorController } from './controllers/weather-processor.controller';
import { WeatherProcessorService } from './services/weather-processor.service';
import { PubSubModule } from '@app/pubsub';

@Module({
  imports: [PubSubModule],
  controllers: [WeatherProcessorController],
  providers: [WeatherProcessorService],
})
export class AppModule {}
