export class User {
  constructor(
    private readonly _id: string,
    private readonly _accountId: string,
    private readonly _firstName?: string,
    private readonly _lastName?: string,
    private readonly _age?: number,
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
}
