import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TravelCardsService } from '../../application/travel-cards.service';

@Controller()
export class TravelCardsGrpController {
  public constructor(private readonly travelCardsService: TravelCardsService) {}

  @GrpcMethod('TravelCard', 'createNewTravelCards')
  public async createNewCard(data: {
    userId: string;
    title: string;
    description?: string;
    image?: string;
    amount?: string;
    currency?: string;
  }) {
    return this.travelCardsService.createNewCard(data);
  }

  @GrpcMethod('TravelCard', 'getCardById')
  public async getCardById(data: { id: string }) {
    return this.travelCardsService.getCardById(data.id);
  }
}
