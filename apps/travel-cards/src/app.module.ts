import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database';
import { TravelCardsModule } from './modules/travel-cards.module';
import { AppConfigModule } from '@app/app-config';

@Module({
  imports: [AppConfigModule.forRootAsync(), DatabaseModule, TravelCardsModule],
})
export class AppModule {}
