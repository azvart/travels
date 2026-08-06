import { Injectable } from '@nestjs/common';
import { UserAwardsAbstractRepository } from '../../infrastructure/user-awards/user-awards.abstract.repository';
import { IFindManyUserAwards } from 'libs/interfaces/user-awards';

@Injectable()
export class FindManyUserAwardsHandler {
  public constructor(private readonly userAwardRepository: UserAwardsAbstractRepository) {}

  public async run(data: IFindManyUserAwards) {
    return this.userAwardRepository.findManyUserAwards(data);
  }
}
