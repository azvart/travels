import { ICreateNewAccount } from 'libs/interfaces/account/create-new-account.interface';
import { IAccount, ILoginInput, IUpdateAccountInput } from 'libs/interfaces';

export abstract class AccountAbstractRepository {
  abstract createAccount(data: ICreateNewAccount): Promise<IAccount>;
  abstract updateAccount(
    accountId: string,
    data: Omit<IUpdateAccountInput, 'id'>,
  ): Promise<IAccount>;
  abstract deleteAccount(accountId: string): Promise<string>;
  abstract login(data: Omit<ILoginInput, 'password'>): Promise<IAccount>;
}
