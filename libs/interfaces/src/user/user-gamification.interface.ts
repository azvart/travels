import { IUser } from './user.interface';

export interface IUserGamification {
  id: string;
  user?: IUser;
  userLevel: number;
  userLevelProgress: number;
}
