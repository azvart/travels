import {
  ICreateUserAward,
  IFindManyUserAwards,
  IFindOneUserAward,
  IUpdateUserAward,
  IUserAwards,
} from 'libs/interfaces/user-awards';

export abstract class UserAwardsAbstractRepository {
  abstract createUserAward(data: ICreateUserAward): Promise<IUserAwards>;
  abstract updateUserAward(data: IUpdateUserAward): Promise<IUserAwards>;
  abstract deleteUserAward(userAwardId: string, userId: string): Promise<IUserAwards>;
  abstract findManyUserAwards(data: IFindManyUserAwards): Promise<IUserAwards[]>;
  abstract findOneUserAwards(data: IFindOneUserAward): Promise<IUserAwards>;
}
