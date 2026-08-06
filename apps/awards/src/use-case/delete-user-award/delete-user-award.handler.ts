import { Injectable } from '@nestjs/common';
import { UserAwardsAbstractRepository } from '../../infrastructure/user-awards/user-awards.abstract.repository';

@Injectable()
export class DeleteUserAwardHandler {
  public constructor(private readonly userAwardRepository: UserAwardsAbstractRepository) {}

  public async run(userAwardId: string, userId: string) {
    return this.userAwardRepository.deleteUserAward(userAwardId, userId);
  }
}
