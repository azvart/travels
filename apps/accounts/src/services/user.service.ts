import { Injectable } from '@nestjs/common';
import { UserAbstractRepository } from '../abstracts/user.abstract.repository';
import { User } from '@app/dto';
import { v4 as uuid } from 'uuid';
@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserAbstractRepository) {}

  public async createNewUser(accountId: string) {
    const user = new User(uuid(), accountId);
    await this.userRepository.save(user);
    return this.userRepository.findByAccountId(user.accountId);
  }

  public async findByAccountId(accountId: string) {
    return this.userRepository.findByAccountId(accountId);
  }
}
