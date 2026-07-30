import { IGetUser, IUpdateUserInputInterface, IUser } from 'libs/interfaces';

export abstract class UserAbstractRepository {
  abstract createUser(accountId: string):Promise<IUser>;
  abstract updateUser(userId: string,data:Omit<IUpdateUserInputInterface, 'id'>):Promise<IUser>;
  abstract getUser(data:IGetUser):Promise<IUser>;
  abstract findByAccountId(accountId: string):Promise<IUser>;
}
