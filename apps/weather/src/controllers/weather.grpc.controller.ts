import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WeatherService } from '../services/weather.service';
import { Weather } from '@app/dto';

@Controller()
export class WeatherGrpcController {
  public constructor(private readonly weatherService: WeatherService) {}

  @GrpcMethod('Weather', 'weather')
  public async weather(data: {
    accountId: string;
    userId: string;
    country: string;
  }) {
    return this.weatherService.weather(data);
  }

  @GrpcMethod('Weather', 'create')
  public async createWeather(data: Weather) {
    return this.weatherService.save(data);
  }

  @GrpcMethod('Weather', 'updateOne')
  public async updateOne(data: Partial<Weather> & { weatherId: string }) {
    const weatherData: Partial<Weather> = {
      ...data,
    };
    return this.weatherService.updateOne(data.weatherId, weatherData);
  }

  @GrpcMethod('Weather', 'deleteOne')
  public async deleteOne(data: { weatherId: string }) {
    return this.weatherService.deleteOne(data.weatherId);
  }
}
