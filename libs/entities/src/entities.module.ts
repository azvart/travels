import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AccountOrmEntity,
  TravelCardsOrmEntity,
  UserOrmEntity,
  WeatherCardOrmEntity,
  WeatherOrmEntity,
} from '@app/entities/enity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountOrmEntity,
      UserOrmEntity,
      TravelCardsOrmEntity,
      WeatherCardOrmEntity,
      WeatherOrmEntity,
    ]),
  ],
  exports: [
    TypeOrmModule.forFeature([
      AccountOrmEntity,
      UserOrmEntity,
      TravelCardsOrmEntity,
      WeatherCardOrmEntity,
      WeatherOrmEntity,
    ]),
  ],
})
export class EntitiesModule {}
