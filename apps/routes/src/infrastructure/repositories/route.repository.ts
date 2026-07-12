import { Injectable } from '@nestjs/common';
import { RouteAbstractRepository } from './route.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RouteOrmEntity } from './route.entity';
import { Repository } from 'typeorm';
import { ICreateRoute, IUpdateRoute } from 'libs/interfaces';

@Injectable()
export class RouteRepository implements RouteAbstractRepository {
  public constructor(
    @InjectRepository(RouteOrmEntity)
    private readonly routeRepository: Repository<RouteOrmEntity>,
  ) {}

  public async create(data: ICreateRoute) {
    return this.routeRepository.create(data);
  }

  public async updateByIdAndFetch(routeId: string, data: Omit<IUpdateRoute, 'id'>) {
    const updatedEntity = await this.routeRepository.update(
      {
        id: routeId,
        userId: data.userId
      },
      {
        routeName: data.routeName
      },
    );

    if (!updatedEntity.affected || updatedEntity.affected === 0) {
      throw new Error("Route can't be updated");
    }

    return this.routeRepository.findOneOrFail({
      where: {
        id: routeId,
        userId: data.userId
      },
    });
  }
}
