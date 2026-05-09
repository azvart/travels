import { Injectable } from '@nestjs/common';
import { TravelCardsAbstractRepository } from '../abstracts/travel-cards.abstract.repository';
import { CreateTravelCardInput, UpdateTravelCardInputType } from '@app/types';
import { v4 as uuid } from 'uuid';
import { TravelCards } from '@app/dto';

@Injectable()
export class TravelCardsService {
  public constructor(
    private readonly travelCardsRepository: TravelCardsAbstractRepository,
  ) {}

  public async createNewCard(
    input: CreateTravelCardInput & { userId: string },
  ) {
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
    return this.travelCardsRepository.findOne({
      where: { id },
    });
  }

  public async updateExistTravelCard({
    id,
    ...updatedData
  }: UpdateTravelCardInputType) {
    return this.travelCardsRepository.updateOne(
      {
        id,
      },
      {
        ...updatedData,
      },
    );
  }

  public async deleteExistTravelCard(input: { id: string; userId: string }) {
    return this.travelCardsRepository.deleteOne(input);
  }
  public async getCards() {
    return this.travelCardsRepository.findMany();
  }
}
