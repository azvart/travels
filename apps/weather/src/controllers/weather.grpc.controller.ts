import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WeatherService } from '../services/weather.service';

@Controller()
export class WeatherGrpcController {
  private logger = new Logger(WeatherGrpcController.name);
  public constructor(private readonly weatherService: WeatherService) {}

  @GrpcMethod('Weather', 'weatherData')
  public async weather() {
    this.logger.debug(this.weather.name);
    return this.weatherService.weatherData();
  }
}
