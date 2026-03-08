export class WeatherCard {
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
