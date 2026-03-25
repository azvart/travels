import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WeatherProcessorService } from '../services/weather-processor.service';

@Controller()
export class WeatherProcessorController {
  public constructor(
    private readonly weatherProcessorService: WeatherProcessorService,
  ) {}

  @MessagePattern('weather')
  public weatherPattern(@Payload() message: any) {
    // console.log('MESSAGE', message);
    return this.weatherProcessorService.weatherProcess(message);
  }
}
