import { IUser } from 'libs/interfaces';

export interface IUserFullInterface extends IUser {
  country?: string;
  countryCode?:string;
  street?:string;
  city?:string
}
