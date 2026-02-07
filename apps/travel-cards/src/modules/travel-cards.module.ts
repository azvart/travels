import { Module } from '@nestjs/common';
import { EntitiesModule } from '@app/entities';
import { TravelCardsAbstractRepository } from '../abstracts/travel-cards.abstract.repository';
import { TravelCardsTypeormRepository } from '../repositories/travel-cards.typeorm-repository';
import { TravelCardsService } from '../services/travel-cards.service';
import { TravelCardsGrpController } from '../controllers/travel-card.grpc.controller';

@Module({
  imports: [EntitiesModule],
  controllers: [TravelCardsGrpController],
  providers: [
    TravelCardsService,
    {
      provide: TravelCardsAbstractRepository,
      useClass: TravelCardsTypeormRepository,
    },
  ],
})
export class TravelCardsModule {}
