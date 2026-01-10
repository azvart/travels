import { User } from '@app/dto';

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract findByAccountId(accountId: string): Promise<User | null>;
}
