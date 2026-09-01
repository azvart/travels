import { IUserStatistic } from './user-statistic.interface';

export interface IUpdateUserStatistic extends Omit<Partial<IUserStatistic>, 'id' | 'user'> {}
