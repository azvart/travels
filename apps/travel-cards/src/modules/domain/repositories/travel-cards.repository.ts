import { TravelCards } from '@app/dto';
import { UpdateTravelCardInputType } from '@app/types';

export abstract class TravelCardsRepository {
  abstract createNewCard(input: TravelCards): Promise<TravelCards | null>;
  abstract getCardById(id: string): Promise<TravelCards | null>;
  abstract getCardByUserId(userId: string): Promise<void>;
  abstract updateExistTravelCard(
    input: UpdateTravelCardInputType,
  ): Promise<TravelCards | null>;
  abstract deleteExistTravelCard({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<{ success: boolean } | null>;
}
