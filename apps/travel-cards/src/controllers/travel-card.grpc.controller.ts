import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TravelCardsService } from '../services/travel-cards.service';

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

  @GrpcMethod('TravelCard', 'updateExistTravelCard')
  public async updateExistTravelCard(data: {
    id: string;
    userId: string;
    title?: string;
    description?: string;
    amount?: string;
    currency?: string;
    image?: string;
    timezone?: string;
    timezoneOffset?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    return this.travelCardsService.updateExistTravelCard(data);
  }

  @GrpcMethod('TravelCard', 'deleteExistTravelCard')
  public async deleteExistTravelCard(data: { id: string; userId: string }) {
    return this.travelCardsService.deleteExistTravelCard(data);
  }

  @GrpcMethod('TravelCard', 'getCards')
  public async getCards() {
    return this.travelCardsService.getCards();
  }
}
