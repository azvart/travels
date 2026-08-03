import { IUser } from './user.interface';

export interface IUserTelemetry {
  id: string;
  user?: IUser;
  duration: number;
  steps: number;
  avgPace: number;
  distance: number;
}
