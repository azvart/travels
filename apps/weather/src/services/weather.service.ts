import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserRedisService } from '@app/redis';
import { UserAddressDto } from '@app/dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ClientKafkaProxy } from '@nestjs/microservices';

@Injectable()
export class WeatherService {
  private logger = new Logger(WeatherService.name);

  public constructor(
    private readonly userRedisService: UserRedisService,
    private readonly httpService: HttpService,
    @Inject('WEATHER_KAFKA_SERVICE')
    private readonly weatherClientKafka: ClientKafkaProxy,
  ) {}

  public async weatherData() {
    this.logger.debug(`WeatherService Data users`);
    const allRedisUsers = await this.userRedisService.getAllUsers();
    // const userWeatherData = Promise.all(
    //   allRedisUsers.map(async (user) => await this.getUserWeatherData(user)),
    // );
    this.weatherClientKafka.emit('weather', []);
  }

  private async getUserWeatherData(userWeatherData: UserAddressDto) {
    return await firstValueFrom(
      this.httpService.get(
        `/search?name=${userWeatherData.country}&count=1&language=en&format=json&countryCode=${userWeatherData.countryCode}`,
      ),
    );
  }
}
