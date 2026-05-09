import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  WEATHER_SERVICE_NAME,
  WeatherClient,
} from '@app/proto/generated/weather/weather';

@Injectable()
export class WeatherGrpcService implements OnModuleInit {
  public constructor(
    @Inject('WEATHER_GRPC_SERVICE') private readonly client: ClientGrpc,
  ) {}

  public service: WeatherClient;

  onModuleInit() {
    this.service = this.client.getService<WeatherClient>(WEATHER_SERVICE_NAME);

    console.log(
      `WeatherDataService init and running on ${process.env.WEATHER_GRPC_HOST}:${process.env.WEATHER_GRPC_PORT}`,
    );
  }
}
