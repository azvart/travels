import { Injectable, NotFoundException } from '@nestjs/common';
import { WeatherAbstractRepository } from '../abstracts/weather.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherOrmEntity } from '@app/entities/enity';
import { Repository } from 'typeorm';
import { Weather } from '@app/dto';

@Injectable()
export class WeatherTypeormRepository implements WeatherAbstractRepository {
  public constructor(
    @InjectRepository(WeatherOrmEntity)
    private readonly weatherRepository: Repository<WeatherOrmEntity>,
  ) {}

  public async save(weather: Weather) {
    const weatherEntity = this.weatherRepository.create(weather);
    await this.weatherRepository.save(weatherEntity);
  }

  public async findMany() {
    const weatherEntities = await this.weatherRepository.find();
    return weatherEntities
      ? weatherEntities.map((weatherEntity) =>
          Weather.fromEntity(weatherEntity),
        )
      : null;
  }

  public async update(weatherId: string, weather: Partial<Weather>) {
    const updateOne = await this.weatherRepository.update(
      {
        id: weatherId,
      },
      {
        ...weather,
      },
    );
    if (!updateOne.affected) {
      throw new NotFoundException();
    }
    const weatherEntity = await this.weatherRepository.findOne({
      where: {
        id: weatherId,
      },
    });
    return weatherEntity ? Weather.fromEntity(weatherEntity) : null;
  }

  public async deleteOne(weatherId: string) {
    const deleteOne = await this.weatherRepository.delete({
      id: weatherId,
    });
    if (!deleteOne.affected) {
      throw new NotFoundException();
    }
    return !!deleteOne.affected;
  }
}
