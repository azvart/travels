import { Weather } from '@app/dto';

export abstract class WeatherAbstractRepository {
  abstract save(weather: Weather): Promise<void>;
  abstract findMany(): Promise<Weather[] | null>;
  abstract update(
    weatherId: string,
    weather: Partial<Weather>,
  ): Promise<Weather | null>;
  abstract deleteOne(id: string): Promise<boolean>;
}
