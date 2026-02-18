import { WeatherCard } from '@app/dto';

export abstract class WeatherCardAbstractRepository {
  abstract save(weatherCard: WeatherCard): Promise<void>;
  abstract findMany(): Promise<WeatherCard[] | null>;
  abstract update(weatherCard: Partial<WeatherCard>): Promise<WeatherCard>;
  abstract deleteOne(id: string): Promise<boolean>;
}
