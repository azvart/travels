import { Injectable } from '@nestjs/common';
import { UserAbstractRepository } from '../../infrastructure/user';
import { IGetUser } from 'libs/interfaces';

@Injectable()
export class GetUserHandler {
  public constructor(private readonly userRepository: UserAbstractRepository) {}

  public async run(data: IGetUser) {
    return this.userRepository.getUser(data);
  }
}
