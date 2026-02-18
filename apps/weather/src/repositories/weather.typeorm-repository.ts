import { Injectable } from '@nestjs/common';
import { WeatherAbstractRepository } from '../abstracts/weather.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherOrmEntity } from '@app/entities/enity';
import { Repository } from 'typeorm';

@Injectable()
export class WeatherTypeormRepository implements WeatherAbstractRepository {
  public constructor(
    @InjectRepository(WeatherOrmEntity)
    private readonly weatherRepository: Repository<WeatherOrmEntity>,
  ) {}

  public async save() {}

  public async findMany() {}

  public async update() {}

  public async deleteOne() {}
}
