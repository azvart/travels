import { Injectable, NotFoundException } from '@nestjs/common';
import { TravelCardsAbstractRepository } from '../abstracts/travel-cards.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelCardsOrmEntity } from '@app/entities/enity';
import { Repository } from 'typeorm';
import { TravelCards } from '@app/dto';
import { UpdateTravelCardInputType } from '@app/types';

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

    return this.getCardById(input.id);
  }

  public async getCardById(id: string): Promise<TravelCards | null> {
    const orm = await this.travelCardsRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
      relationLoadStrategy: 'join',
    });
    return orm
      ? new TravelCards(
          orm.id,
          orm.user.id,
          orm.title,
          orm.description,
          orm.image,
          orm.amount,
          orm.currency,
          orm.timezone,
          orm.timezoneOffset,
          orm.startDate,
          orm.endDate,
        )
      : null;
  }

  public async getCardByUserId() {}

  public async updateExistTravelCard(
    input: UpdateTravelCardInputType,
  ): Promise<TravelCards | null> {
    const travelCard = await this.travelCardsRepository.update(
      { id: input.id, userId: input.userId } as any,
      input,
    );
    if (travelCard.affected === 0) {
      throw new NotFoundException();
    }
    const orm = await this.getCardById(input.id);

    return orm
      ? new TravelCards(
          orm.id,
          input.userId,
          orm.title,
          orm.description,
          orm.image,
          orm.amount,
          orm.currency,
          orm.timezone,
          orm.timezoneOffset,
          orm.startDate,
          orm.endDate,
        )
      : null;
  }

  public async deleteExistTravelCard({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<{ success: boolean } | null> {
    const travelCard = await this.travelCardsRepository.delete({
      id,
      userId,
    } as any);

    if (travelCard.affected === 0) {
      throw new NotFoundException();
    }

    return {
      success: true,
    };
  }

  public async getCards() {
    const orm = await this.travelCardsRepository.find({
      relations: ['user'],
    });

    return orm
      ? orm.map(
          (item) =>
            new TravelCards(
              item.id,
              item.user.id,
              item.title,
              item.description,
              item.image,
              item.amount,
              item.currency,
              item.timezone,
              item.timezoneOffset,
              item.startDate,
              item.endDate,
            ),
        )
      : null;
  }
}
