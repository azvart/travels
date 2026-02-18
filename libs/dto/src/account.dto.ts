import { User } from './user.dto';
import { AccountOrmEntity } from '@app/entities/enity';

export class Account {
  public static fromEntity(account: AccountOrmEntity) {
    return new Account(
      account.id,
      account.email,
      account.password,
      account.registrationType,
      account.isEmailVerified,
    );
  }

  constructor(
    private readonly _id: string,
    private readonly _email: string,
    private readonly _password: string,
    private _registrationType: string = 'credentials',
    private readonly _isEmailVerified: boolean = false,
    private readonly _user: User | undefined = undefined,
  ) {}

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get registrationType() {
    return this._registrationType;
  }

  get isEmailVerified() {
    return this._isEmailVerified;
  }

  get user() {
    return this._user;
  }
}
