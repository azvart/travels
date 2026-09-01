import { Injectable } from '@nestjs/common';
import { UserStatisticAbstractRepository } from './user-statistic.abstract.repository';
import { IUpdateUserStatistic } from 'libs/interfaces/user-statistic';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatisticEntity } from '@app/entities';
import { Repository } from 'typeorm';
import { c } from '@apollo/client/react/internal/compiler-runtime';

@Injectable()
export class UserStatisticRepository implements UserStatisticAbstractRepository {
  public constructor(
    @InjectRepository(UserStatisticEntity)
    private readonly userStatisticRepository: Repository<UserStatisticEntity>,
  ) {}

  public async createUserStatistic(userId: string) {
    return this.userStatisticRepository.save(
      this.userStatisticRepository.create({
        user: {
          id: userId,
        },
        countries: []
      }),
    );
  }

  public async updateUserStatistic(userId: string, data: IUpdateUserStatistic) {
    const currentUserStatistic = await this.userStatisticRepository.findOneOrFail({
      where: {
        user: {
          id: userId
        }
      }
    });

    const updatedResult = await this.userStatisticRepository.update(
      {
        user: {
          id: userId,
        },
      },
      {
        steps: data.steps ? currentUserStatistic.steps + data.steps : currentUserStatistic.steps,
        finishedQuests: data.finishedQuests ? currentUserStatistic.finishedQuests + data.finishedQuests : currentUserStatistic.finishedQuests,
        finishedRoutes: data.finishedRoutes ? currentUserStatistic.finishedRoutes : currentUserStatistic.finishedRoutes,
        countries: data.countries ? [...currentUserStatistic.countries, ...data.countries]: [...currentUserStatistic.countries],
        attachedQuests: data.attachedQuests ? currentUserStatistic.attachedQuests + data.attachedQuests : currentUserStatistic.attachedQuests,
        grantedAwards: data.grantedAwards ? currentUserStatistic.grantedAwards + data.grantedAwards : currentUserStatistic.grantedAwards,
        createdRoutes: data.createdRoutes ? currentUserStatistic.createdRoutes + data.createdRoutes : currentUserStatistic.createdRoutes,
      },
    );

    if (!updatedResult.affected) {
      throw new Error(`Can't update statistic with userId: ${userId}`);
    }

    return this.userStatisticRepository.findOneOrFail({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  public async findManyUserStatistic() {
    return this.userStatisticRepository.find();
  }

  public async findOneUserStatistic(userId: string) {
    return this.userStatisticRepository.findOneOrFail({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}
