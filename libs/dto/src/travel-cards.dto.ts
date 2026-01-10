import { User } from '@app/dto/user.dto';

export class TravelCards {
  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _title: string,
    private readonly _description?: string,
    private readonly _image?: string,
    private readonly _amount?: number,
    private readonly _currency?: string,
    private readonly _user?: User,
  ) {}

  get id() {
    return this._id;
  }

  get userId() {
    return this._userId;
  }

  get title() {
    return this._title;
  }
  get description() {
    return this._description;
  }

  get amount() {
    return this._amount;
  }

  get currency() {
    return this._currency;
  }

  get image() {
    return this._image;
  }

  get user() {
    return this._user;
  }
}
