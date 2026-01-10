import { Injectable } from '@nestjs/common';
import { TravelCardsRepository } from '../domain/repositories/travel-cards.repository';
import { CreateTravelCardInput } from '../interfaces/inputs';
import { v4 as uuid } from 'uuid';
import { TravelCards } from '@app/dto';

@Injectable()
export class TravelCardsService {
  public constructor(
    private readonly travelCardsRepository: TravelCardsRepository,
  ) {}

  public async createNewCard(input: CreateTravelCardInput) {
    const travelCard = new TravelCards(
      uuid(),
      input.userId,
      input.title,
      input.description,
      input.image,
      input.amount,
      input.currency,
    );
    return this.travelCardsRepository.createNewCard(travelCard);
  }

  public async getCardById(id: string) {
    return this.travelCardsRepository.getCardById(id);
  }
}
