import { Module } from '@nestjs/common';
import { EntitiesModule } from '@app/entities';
import { TravelCardsRepository } from './domain/repositories/travel-cards.repository';
import { TravelCardsTypeormRepository } from './infrastructure/persistense/travel-cards.typeorm-repository';
import { TravelCardsService } from './application/travel-cards.service';

@Module({
  imports: [EntitiesModule],
  providers: [
    TravelCardsService,
    {
      provide: TravelCardsRepository,
      useClass: TravelCardsTypeormRepository,
    },
  ],
})
export class TravelCardsModule {}
