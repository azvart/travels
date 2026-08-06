import { Injectable } from '@nestjs/common';
import { UserAwardsAbstractRepository } from '../../infrastructure/user-awards/user-awards.abstract.repository';
import { ICreateUserAward } from 'libs/interfaces/user-awards';

@Injectable()
export class CreateUserAwardHandler {
  public constructor(private readonly userAwardRepository: UserAwardsAbstractRepository) {}

  public async run(data: ICreateUserAward) {
    return this.userAwardRepository.createUserAward(data);
  }
}
