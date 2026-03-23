import { Module } from '@nestjs/common';
import { WeatherGrpcController } from './controllers/weather.grpc.controller';
import { WeatherService } from './services/weather.service';
import { WeatherAbstractRepository } from './abstracts/weather.abstract.repository';
import { WeatherTypeormRepository } from './repositories/weather.typeorm-repository';

@Module({
  controllers: [WeatherGrpcController],
  providers: [
    WeatherService,
    {
      provide: WeatherAbstractRepository,
      useClass: WeatherTypeormRepository,
    },
  ],
})
export class AppModule {}
