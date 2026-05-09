import { Injectable, NotFoundException } from '@nestjs/common';
import { TravelCardsAbstractRepository } from '../abstracts/travel-cards.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelCardsOrmEntity } from '@app/entities/enity';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { TravelCards } from '@app/dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class TravelCardsTypeormRepository
  implements TravelCardsAbstractRepository
{
  public constructor(
    @InjectRepository(TravelCardsOrmEntity)
    public readonly travelCardsRepository: Repository<TravelCardsOrmEntity>,
  ) {}

  public async createNewCard(input: TravelCards): Promise<TravelCards | null> {
    await this.travelCardsRepository.save(
      this.travelCardsRepository.create({
        id: input.id,
        user: {
          id: input.userId,
        },
        description: input.description,
        title: input.title,
        amount: input.amount,
        currency: input.currency,
        image: input.image,
      }),
    );

    return this.findOne({
      where: { id: input.id },
    });
  }

  public async findOne(options: FindOneOptions<TravelCardsOrmEntity>) {
    const orm = await this.travelCardsRepository.findOne(options);

    return orm ? TravelCards.fromEntity(orm) : null;
  }

  public async findMany(options?: FindManyOptions<TravelCardsOrmEntity>) {
    const orm = await this.travelCardsRepository.find(options);

    return orm ? orm.map((item) => TravelCards.fromEntity(item)) : null;
  }

  public async updateOne(
    entity: FindOptionsWhere<TravelCardsOrmEntity>,
    updatedData: QueryDeepPartialEntity<TravelCardsOrmEntity>,
  ) {
    const updatedResult = await this.travelCardsRepository.update(
      entity,
      updatedData,
    );

    if (updatedResult.affected === 0) {
      throw new NotFoundException();
    }

    const orm = await this.findOne({
      where: {
        id: entity.id,
      },
    });

    return orm ?? null;
  }

  public async deleteOne(criteria: FindOptionsWhere<TravelCardsOrmEntity>) {
    const deletedResult = await this.travelCardsRepository.delete(criteria);

    if (deletedResult.affected === 0) {
      throw new NotFoundException();
    }

    return {
      success: true,
    };
  }
}
