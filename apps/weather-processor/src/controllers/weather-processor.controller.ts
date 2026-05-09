import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WeatherProcessorService } from '../services/weather-processor.service';

@Controller()
export class WeatherProcessorController {
  private logger = new Logger(WeatherProcessorController.name);

  public constructor(
    private readonly weatherProcessorService: WeatherProcessorService,
  ) {}

  @MessagePattern('weather')
  public weatherPattern(@Payload() message: any) {
    this.logger.debug(this.weatherPattern.name, message);
    return this.weatherProcessorService.weatherProcess(message);
  }
}
