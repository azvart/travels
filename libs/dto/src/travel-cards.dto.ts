import { User } from '@app/dto/user.dto';

export class TravelCards {
  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _title: string,
    private readonly _description?: string,
    private readonly _image?: string,
    private readonly _amount?: string,
    private readonly _currency?: string,
    private readonly _timezone?: string,
    private readonly _timezoneOffset?: string,
    private readonly _startDate?: Date,
    private readonly _endDate?: Date,
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

  get timezone() {
    return this._timezone;
  }

  get timezoneOffset() {
    return this._timezoneOffset;
  }
  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  get user() {
    return this._user;
  }
}
