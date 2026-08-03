import { IAccount } from '../account';

export interface IUser {
  id: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  country?: string;
  countryCode?: string;
  street?: string;
  city?: string;
  account?: IAccount;
}
