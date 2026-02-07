import { User } from '@app/dto';

export abstract class UserAbstractRepository {
  abstract save(user: User): Promise<void>;
  abstract findByAccountId(accountId: string): Promise<User | null>;
}
