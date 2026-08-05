import { IAwards } from '../awards';

export interface IUserAwards {
  id: string;
  userId: string;
  awards: IAwards;
  grantedAt: Date | null;
}
