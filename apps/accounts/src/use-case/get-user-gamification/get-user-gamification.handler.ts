import { Injectable } from '@nestjs/common';
import { UserAbstractRepository } from '../../infrastructure/user';

@Injectable()
export class GetUserGamificationHandler {
  public constructor(private readonly userRepository: UserAbstractRepository) {}

  public async run(userId: string) {
    return this.userRepository.getUserGamification(userId);
  }
}
