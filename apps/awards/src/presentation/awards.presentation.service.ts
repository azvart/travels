import { Injectable } from '@nestjs/common';
import { CreateAwardHandler } from '../use-case/create-award/create-award.handler';
import { UpdateAwardHandler } from '../use-case/update-award/update-award.handler';
import { DeleteAwardHandler } from '../use-case/delete-award/delete-award.handler';
import { FindManyAwardsHandler } from '../use-case/find-many-awards/find-many-awards.handler';
import { FindOneAwardHandler } from '../use-case/find-one-award/find-one-award.handler';
import { CreateUserAwardHandler } from '../use-case/create-user-award/create-user-award.handler';
import { UpdateUserAwardHandler } from '../use-case/update-user-award/update-user-award.handler';
import { DeleteUserAwardHandler } from '../use-case/delete-user-award/delete-user-award.handler';
import { FindManyUserAwardsHandler } from '../use-case/find-many-user-awards/find-many-user-awards.handler';
import { FindOneUserAwardsHandler } from '../use-case/find-one-user-awards/find-one-user-awards.handler';
import { ICreateAward, IUpdateAward } from 'libs/interfaces/awards';
import {
  ICreateUserAward,
  IFindManyUserAwards,
  IFindOneUserAward,
  IUpdateUserAward,
} from 'libs/interfaces/user-awards';

@Injectable()
export class AwardsPresentationService {
  public constructor(
    private readonly createAwardHandler: CreateAwardHandler,
    private readonly updateAwardHandler: UpdateAwardHandler,
    private readonly deleteAwardHandler: DeleteAwardHandler,
    private readonly findManyAwardsHandler: FindManyAwardsHandler,
    private readonly findOneAwardHandler: FindOneAwardHandler,

    private readonly createUserAwardHandler: CreateUserAwardHandler,
    private readonly updateUserAwardHandler: UpdateUserAwardHandler,
    private readonly deleteUserAwardHandler: DeleteUserAwardHandler,
    private readonly findManyUserAwardsHandler: FindManyUserAwardsHandler,
    private readonly findOneUserAwardsHandler: FindOneUserAwardsHandler,
  ) {}

  public async createAward(data: ICreateAward) {
    return this.createAwardHandler.run(data);
  }

  public async createUserAward(data: ICreateUserAward) {
    return this.createUserAwardHandler.run(data);
  }

  public async updateAward(data: IUpdateAward) {
    return this.updateAwardHandler.run(data);
  }

  public async updateUserAward(data: IUpdateUserAward) {
    return this.updateUserAwardHandler.run(data);
  }

  public async deleteAward(id: string) {
    return this.deleteAwardHandler.run(id);
  }

  public async deleteUserAward(userAwardId: string, userId: string) {
    return this.deleteUserAwardHandler.run(userAwardId, userId);
  }

  public async findManyAwards() {
    return this.findManyAwardsHandler.run();
  }

  public async findManyUserAwards(data: IFindManyUserAwards) {
    return this.findManyUserAwardsHandler.run(data);
  }

  public async findOneAward(id: string) {
    return this.findOneAwardHandler.run(id);
  }
  public async findOneUserAwards(data: IFindOneUserAward) {
    return this.findOneUserAwardsHandler.run(data);
  }
}
