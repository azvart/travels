import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AccountOrmEntity,
  TravelCardsOrmEntity,
  UserOrmEntity,
  WeatherCardOrmEntity,
  WeatherOrmEntity,
  UserAddressOrmEntity,
} from '@app/entities/enity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountOrmEntity,
      UserOrmEntity,
      TravelCardsOrmEntity,
      WeatherCardOrmEntity,
      WeatherOrmEntity,
      UserAddressOrmEntity,
    ]),
  ],
  exports: [
    TypeOrmModule.forFeature([
      AccountOrmEntity,
      UserOrmEntity,
      TravelCardsOrmEntity,
      WeatherCardOrmEntity,
      WeatherOrmEntity,
      UserAddressOrmEntity,
    ]),
  ],
})
export class EntitiesModule {}
