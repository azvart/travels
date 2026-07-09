import { User } from '@app/dto';

export abstract class UserAbstractRepository {
  abstract save(user: User): Promise<void>;
  abstract findByAccountId(accountId: string): Promise<User | null>;
  abstract updateUserById(
    userId: string,
    updatedData: { firstName: string; lastName: string; age: number },
  ): Promise<User | null>;
  abstract getUserById(userId: string):Promise<any>;
}
