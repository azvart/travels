import { Injectable } from '@nestjs/common';
import { UserAbstractRepository } from '../../infrastructure/user';
import { IUpdateUserInputInterface } from 'libs/interfaces';


@Injectable()
export class UpdateUserHandler {

  public constructor(
    private readonly userRepository: UserAbstractRepository
  ){}

  public async run(userId: string, data:Omit<IUpdateUserInputInterface, 'id'>){
    return this.userRepository.updateUser(userId,data);
  }

}
