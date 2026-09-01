import { UserRoleEnum } from 'libs/interfaces/user/user-role.enum';

export interface IGetUser {
  userId: string;
  accountId: string;
  email: string;
  role: UserRoleEnum;
}
