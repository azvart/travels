import { WeatherOrmEntity } from '@app/entities/enity';

export class Weather {
  public static fromEntity(weather: WeatherOrmEntity) {
    return new Weather(
      weather.id,
      weather.accountId,
      weather.country,
      weather.city,
    );
  }

  public constructor(
    private readonly _id: string,
    private readonly _accountId: string,
    private readonly _country?: string,
    private readonly _city?: string,
  ) {}

  get id() {
    return this._id;
  }

  get country() {
    return this._country;
  }

  get city() {
    return this._city;
  }

  get accountId() {
    return this._accountId;
  }
}
