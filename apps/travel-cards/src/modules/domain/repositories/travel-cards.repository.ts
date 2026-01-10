import { TravelCards } from '@app/dto';

export abstract class TravelCardsRepository {
  abstract createNewCard(input: TravelCards): Promise<TravelCards | null>;
  abstract getCardById(id: string): Promise<TravelCards | null>;
  abstract getCardByUserId(userId: string): Promise<void>;
}
