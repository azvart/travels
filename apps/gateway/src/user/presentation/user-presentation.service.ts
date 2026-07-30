import { Injectable } from '@nestjs/common';
import { IGetUser, IUpdateUserInputInterface } from 'libs/interfaces';
import { UpdateUserHandler } from '../use-case/update-user/update-user.handler';
import { GetUserFullHandler } from '../use-case/get-user-full/get-user-full.handler';

@Injectable()
export class UserPresentationService{

  public constructor(
    private readonly updateUserHandler: UpdateUserHandler,
    private readonly getUserFullHandler: GetUserFullHandler
  ){}

  public async updateUser(input: IUpdateUserInputInterface){
    return this.updateUserHandler.run(input);
  }


  public async getUserFull(data: IGetUser){
    return this.getUserFullHandler.run(data);
  }

}
