import { Injectable } from '@nestjs/common';
import { RouteAbstractRepository } from './route.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RouteOrmEntity } from './route.entity';
import { Repository } from 'typeorm';
import { ICreateRoute } from 'libs/interfaces';

@Injectable()
export class RouteRepository implements RouteAbstractRepository {
  public constructor(
    @InjectRepository(RouteOrmEntity)
    private readonly routeRepository: Repository<RouteOrmEntity>,
  ) {}


  public async create(data: ICreateRoute) {
    return this.routeRepository.create(data);
  }
}
