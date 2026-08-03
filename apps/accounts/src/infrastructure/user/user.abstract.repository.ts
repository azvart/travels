import {
  IGetUser,
  IUpdateUserInputInterface,
  IUpdateUserTelemetry,
  IUser,
  IUserGamification,
  IUserTelemetry,
} from 'libs/interfaces';

export abstract class UserAbstractRepository {
  abstract createUser(accountId: string):Promise<IUser>;
  abstract updateUser(userId: string,data:Omit<IUpdateUserInputInterface, 'id'>):Promise<IUser>;
  abstract getUser(data:IGetUser):Promise<IUser>;
  abstract findByAccountId(accountId: string):Promise<IUser>;
  abstract createUserGamification(userId:string):Promise<IUserGamification>;
  abstract createUserTelemetry(userId: string, routeId: string):Promise<IUserTelemetry>;
  abstract getUserTelemetry(userId: string, routeId: string):Promise<IUserTelemetry>;
  abstract getUserGamification(userId: string):Promise<IUserGamification>;
  abstract updateUserTelemetry(data: IUpdateUserTelemetry):Promise<boolean>
}
