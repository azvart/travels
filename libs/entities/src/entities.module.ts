import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AccountOrmEntity,
  TravelCardsOrmEntity,
  UserOrmEntity,
  WeatherCardOrmEntity,
  WeatherOrmEntity,
  AchievementsEntity,
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
    ]),
  ],
})
export class EntitiesModule {}
