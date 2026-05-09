import { TravelCards } from '@app/dto';
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { TravelCardsOrmEntity } from '@app/entities/enity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class TravelCardsAbstractRepository {
  abstract createNewCard(input: TravelCards): Promise<TravelCards | null>;

  abstract findOne(
    options: FindOneOptions<TravelCardsOrmEntity>,
  ): Promise<TravelCards | null>;
  abstract findMany(
    options?: FindManyOptions<TravelCardsOrmEntity>,
  ): Promise<TravelCards[] | null>;
  abstract updateOne(
    criteria: FindOptionsWhere<TravelCardsOrmEntity>,
    updatedData: QueryDeepPartialEntity<TravelCardsOrmEntity>,
  ): Promise<TravelCards | null>;
  abstract deleteOne(
    criteria: FindOptionsWhere<TravelCardsOrmEntity>,
  ): Promise<{ success: boolean }>;
}
