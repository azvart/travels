import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AccountOrmEntity,
  TravelCardsOrmEntity,
  UserOrmEntity,
  WeatherCardOrmEntity,
  WeatherOrmEntity,
  AchievementsEntity,
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
      AchievementsEntity,
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
      AchievementsEntity,
      UserAddressOrmEntity,
    ]),
  ],
})
export class EntitiesModule {}
