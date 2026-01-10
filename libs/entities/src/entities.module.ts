import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AccountOrmEntity,
  TravelCardsOrmEntity,
  UserOrmEntity,
} from '@app/entities/enity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountOrmEntity,
      UserOrmEntity,
      TravelCardsOrmEntity,
    ]),
  ],
  exports: [
    TypeOrmModule.forFeature([
      AccountOrmEntity,
      UserOrmEntity,
      TravelCardsOrmEntity,
    ]),
  ],
})
export class EntitiesModule {}
