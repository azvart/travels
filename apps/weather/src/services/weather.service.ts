import { Injectable } from '@nestjs/common';
import { pubSub } from '@app/pubsub';
import { WeatherAbstractRepository } from '../abstracts/weather.abstract.repository';
import { Weather } from '@app/dto';

@Injectable()
export class WeatherService {
  public constructor(
    private readonly weatherRepository: WeatherAbstractRepository,
  ) {}

  public async weather(data: {
    accountId: string;
    userId: string;
    country: string;
  }) {
    await pubSub.publish('weatherSubscription', data);
  }

  public async save(weather: Weather): Promise<void> {
    await this.weatherRepository.save(weather);
  }

  public async findMany() {
    return this.weatherRepository.findMany();
  }

  public async updateOne(weatherId: string, data: Partial<Weather>) {
    return this.weatherRepository.update(weatherId, data);
  }

  public async deleteOne(weatherId: string) {
    return this.weatherRepository.deleteOne(weatherId);
  }
}
