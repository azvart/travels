import { IAccount } from '../account';
import { UserRoleEnum } from 'libs/interfaces/user/user-role.enum';

export interface IUser {
  id: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  country?: string;
  countryCode?: string;
  street?: string;
  city?: string;
  role: UserRoleEnum;
  account?: IAccount;
}
