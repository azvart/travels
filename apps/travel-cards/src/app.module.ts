import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database';
import { TravelCardsModule } from './modules/travel-cards.module';

@Module({
  imports: [DatabaseModule, TravelCardsModule],
})
export class AppModule {}
