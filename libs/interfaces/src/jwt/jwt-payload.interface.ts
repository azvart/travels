import { UserRoleEnum } from 'libs/interfaces/user';

export interface IJWTPayload {
  userId: string;
  email: string;
  accountId: string;
  role: UserRoleEnum;
}
