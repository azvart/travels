import { WeatherCardOrmEntity } from '@app/entities/enity';

export class WeatherCard {
  public static fromEntity(entity: WeatherCardOrmEntity) {
    return new WeatherCard(
      entity.id,
      entity.travelCardId,
      entity.country,
      entity.city,
    );
  }

  public constructor(
    private readonly _id: string,
    private readonly _travelCardId: string,
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

  get travelCardId() {
    return this._travelCardId;
  }
}
