import { IUpdateUserStatistic, IUserStatistic } from 'libs/interfaces/user-statistic';

export abstract class UserStatisticAbstractRepository {
  abstract createUserStatistic(userId: string): Promise<IUserStatistic>;
  abstract updateUserStatistic(userId: string, data: IUpdateUserStatistic): Promise<IUserStatistic>;
  abstract findOneUserStatistic(userId: string): Promise<IUserStatistic>;
  abstract findManyUserStatistic(): Promise<IUserStatistic[]>;
}
