import { Injectable } from '@nestjs/common';
import { UserAwardsAbstractRepository } from '../../infrastructure/user-awards/user-awards.abstract.repository';
import { IUpdateUserAward } from 'libs/interfaces/user-awards';

@Injectable()
export class UpdateUserAwardHandler {
  public constructor(private readonly userAwardRepository: UserAwardsAbstractRepository) {}

  public async run(data: IUpdateUserAward) {
    return this.userAwardRepository.updateUserAward(data);
  }
}
