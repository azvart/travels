import { Module } from '@nestjs/common';
import { RedisModule } from '@app/redis';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherService } from './services/weather.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigModule } from '@app/app-config';
import { WeatherGrpcController } from './controllers/weather.grpc.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    AppConfigModule.forRootAsync(),
    RedisModule,
    ScheduleModule.forRoot(),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        maxRedirects:
          configService.get<number>('WEATHER_API_MAX_REDIRECTS') || 0,
        timeout: configService.get<number>('WEATHER_API_TIMEOUT') || 5000,
        baseURL:
          configService.get<string>('WEATHER_API_BASE_URL') ||
          'https://geocoding-api.open-meteo.com/v1',
      }),
      inject: [ConfigService],
    }),
    ClientsModule.register([
      {
        name: 'WEATHER_KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'weather-client',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'weather-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [WeatherGrpcController],
  providers: [WeatherService],
})
export class AppModule {}
