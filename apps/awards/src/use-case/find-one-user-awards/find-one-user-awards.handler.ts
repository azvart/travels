import { Injectable } from '@nestjs/common';
import { UserAwardsAbstractRepository } from '../../infrastructure/user-awards/user-awards.abstract.repository';
import { IFindOneUserAward } from 'libs/interfaces/user-awards';

@Injectable()
export class FindOneUserAwardsHandler {
  public constructor(private readonly userAwardsRepository: UserAwardsAbstractRepository) {}

  public async run(data: IFindOneUserAward) {
    return this.userAwardsRepository.findOneUserAwards(data);
  }
}
