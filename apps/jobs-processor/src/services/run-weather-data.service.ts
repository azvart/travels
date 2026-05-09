import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { WeatherGrpcService } from '@app/grpc-api-clients/weather/weather-grpc.service';

@Injectable()
export class RunWeatherDataService {
  public readonly logger = new Logger(RunWeatherDataService.name);
  public constructor(private readonly weatherGrpcService: WeatherGrpcService) {}

  public async runWeatherData() {
    this.logger.debug('Run WeatherDataService');
    return firstValueFrom(this.weatherGrpcService.service.weatherData({}));
  }
}
