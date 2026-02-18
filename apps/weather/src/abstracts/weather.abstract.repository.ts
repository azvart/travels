import { Weather } from '@app/dto';

export abstract class WeatherAbstractRepository {
  abstract save(weather: Weather): Promise<void>;
  abstract findMany(): Promise<Weather[] | null>;
  abstract update(weather: Partial<Weather>): Promise<Weather>;
  abstract deleteOne(id: string): Promise<boolean>;
}
