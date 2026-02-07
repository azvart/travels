import { Account } from '@app/dto';
import { UpdateAccountInput } from '@app/types/account/inputs/update-account.input';

export abstract class AccountAbstractRepository {
  abstract save(account: Account): Promise<void>;
  abstract findById(id: string): Promise<Account | null>;
  abstract findByEmail(email: string): Promise<Account | null>;
  abstract deleteAccount(id: string): Promise<boolean>;
  abstract updateAccount(account: UpdateAccountInput): Promise<Account | null>;
  abstract verifyAccountEmail(email: string): Promise<Account | null>;
  abstract login(email: string, password: string): Promise<Account>;
}
