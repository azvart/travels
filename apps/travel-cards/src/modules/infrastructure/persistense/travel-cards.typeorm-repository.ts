import { Injectable } from '@nestjs/common';
import { TravelCardsRepository } from '../../domain/repositories/travel-cards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelCardsOrmEntity } from '@app/entities/enity';
import { Repository } from 'typeorm';
import { TravelCards } from '@app/dto';

@Injectable()
export class TravelCardsTypeormRepository implements TravelCardsRepository {
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
}
