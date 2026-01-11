import { Module } from '@nestjs/common';
import { EntitiesModule } from '@app/entities';
import { TravelCardsRepository } from './domain/repositories/travel-cards.repository';
import { TravelCardsTypeormRepository } from './infrastructure/persistense/travel-cards.typeorm-repository';
import { TravelCardsService } from './application/travel-cards.service';
import { TravelCardsGrpController } from './interfaces/grpc/travel-card.grpc.controller';

@Module({
  imports: [EntitiesModule],
  controllers: [TravelCardsGrpController],
  providers: [
    TravelCardsService,
    {
      provide: TravelCardsRepository,
      useClass: TravelCardsTypeormRepository,
    },
  ],
})
export class TravelCardsModule {}
