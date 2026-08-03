import { Injectable } from '@nestjs/common';
import { UserAbstractRepository } from '../../infrastructure/user';

@Injectable()
export class CreateUserHandler {
  public constructor(private readonly userRepository: UserAbstractRepository) {}

  public async run(accountId: string) {
    return this.userRepository.createUser(accountId);
  }
}
