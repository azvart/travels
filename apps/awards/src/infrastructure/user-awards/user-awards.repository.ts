import { Injectable } from '@nestjs/common';
import { UserAwardsAbstractRepository } from './user-awards.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAwardsEntity } from '@app/entities';
import { Repository } from 'typeorm';
import {
  ICreateUserAward,
  IFindManyUserAwards,
  IFindOneUserAward,
  IUpdateUserAward,
} from 'libs/interfaces/user-awards';

@Injectable()
export class UserAwardsRepository implements UserAwardsAbstractRepository {
  public constructor(
    @InjectRepository(UserAwardsEntity)
    private readonly userAwardsRepository: Repository<UserAwardsEntity>,
  ) {}

  public async createUserAward(data: ICreateUserAward) {
    return this.userAwardsRepository.save(this.userAwardsRepository.create(data));
  }

  public async updateUserAward(data: IUpdateUserAward) {
    const updatedUserAwards = await this.userAwardsRepository.update(
      {
        id: data.id,
        userId: data.userId,
      },
      {
        grantedAt: data.grantedAt,
      },
    );

    if (!updatedUserAwards.affected) {
      throw new Error(`User Awards with id ${data.id} and userId ${data.userId} can't be updated`);
    }

    return this.userAwardsRepository.findOneOrFail({
      where: {
        id: data.id,
        userId: data.userId,
      },
    });
  }

  public async findManyUserAwards(data: IFindManyUserAwards) {
    return this.userAwardsRepository.find({
      where: {
        userId: data.userId,
      },
    });
  }

  public async findOneUserAwards(data: IFindOneUserAward) {
    return this.userAwardsRepository.findOneOrFail({
      where: {
        id: data.id,
        userId: data.userId,
      },
    });
  }

  public async deleteUserAward(userAwardId: string, userId: string) {
    const userAward = await this.userAwardsRepository.findOneOrFail({
      where: {
        id: userAwardId,
        userId: userId,
      },
    });
    if (!userAward) {
      throw new Error(`User Award with id ${userAwardId} and userId ${userId} not exist`);
    }

    const deleteUserAward = await this.userAwardsRepository.delete({
      userId: userId,
      id: userAwardId,
    });

    if (!deleteUserAward.affected) {
      throw new Error(`Can't delete user award with id: ${userAwardId} and userId: ${userId}`);
    }

    return userAward;
  }
}
