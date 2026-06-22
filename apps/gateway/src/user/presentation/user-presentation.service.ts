import { Injectable } from '@nestjs/common';
import { IUpdateUserInputInterface } from 'libs/interfaces';
import { UpdateUserHandler } from '../use-case/update-user/update-user.handler';

@Injectable()
export class UserPresentationService{

  public constructor(
    private readonly updateUserHandler: UpdateUserHandler
  ){}

  public async updateUser(input: IUpdateUserInputInterface){
    return this.updateUserHandler.run(input);
  }

}
