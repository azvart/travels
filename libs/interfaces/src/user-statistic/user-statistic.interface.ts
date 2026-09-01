import { IUser } from 'libs/interfaces/user';

export interface IUserStatistic {
  id: string;
  steps: number;
  createdRoutes: number;
  finishedRoutes: number;
  grantedAwards: number;
  finishedQuests: number;
  attachedQuests: number;
  countries: string[];
  user: IUser | null;
}
