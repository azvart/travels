import { UserOrmEntity } from '@app/entities/enity';
import { Account } from '@app/dto/account.dto';

export class User {
  public static fromEntity(user: UserOrmEntity) {
    return user
      ? new User(
          user.id,
          user.accountId,
          user.firstName,
          user.lastName,
          user.age,
          Account.fromEntity(user.account),
        )
      : null;
  }

  constructor(
    private readonly _id: string,
    private readonly _accountId: string,
    private readonly _firstName?: string,
    private readonly _lastName?: string,
    private readonly _age?: number,
    private readonly _account?: Account | null,
  ) {}

  get id() {
    return this._id;
  }
  get accountId() {
    return this._accountId;
  }

  get firstName() {
    return this._firstName;
  }
  get lastName() {
    return this._lastName;
  }
  get age() {
    return this._age;
  }

  get account() {
    return this._account;
  }
}
