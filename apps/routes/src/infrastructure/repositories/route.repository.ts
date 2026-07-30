import { Injectable } from '@nestjs/common';
import { RouteAbstractRepository } from './route.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RouteOrmEntity } from './route.entity';
import { Repository } from 'typeorm';
import {
  ICreateRoute,
  IDeleteUserRoute,
  IFindManyRoutes,
  IFindOneRoute,
  IUpdateRoute,
} from 'libs/interfaces';

@Injectable()
export class RouteRepository implements RouteAbstractRepository {
  public constructor(
    @InjectRepository(RouteOrmEntity)
    private readonly routeRepository: Repository<RouteOrmEntity>,
  ) {}

  public async create(data: ICreateRoute) {
    return this.routeRepository.save(this.routeRepository.create(data));
  }

  public async updateByIdAndFetch(routeId: string, data: Omit<IUpdateRoute, 'id'>) {
    const updatedEntity = await this.routeRepository.update(
      {
        id: routeId,
        userId: data.userId,
      },
      {
        routeName: data.routeName,
        country: data.country
      },
    );

    if (!updatedEntity.affected || updatedEntity.affected === 0) {
      throw new Error("Route can't be updated");
    }

    return this.routeRepository.findOneOrFail({
      where: {
        id: routeId,
        userId: data.userId,
      },
    });
  }

  public async findOneRoute(data:IFindOneRoute){
    return this.routeRepository.findOneOrFail({
      where: {
        id: data.id
      }
    })
  }

  public async findManyRoutes(data:IFindManyRoutes & { userId: string }){
    if(!data.externalRoutes){
      return this.routeRepository.findBy({
        country: data.country,
        userId: data.userId,
      });
    }
    return this.routeRepository.findBy({
      country: data.country
    })
  }

  public async deleteUserRoute(data: IDeleteUserRoute & { userId: string }){
    const deletedUserRoute = await this.routeRepository.delete({
      id: data.id,
      userId: data.userId
    });
    console.log(deletedUserRoute.affected);
    if(deletedUserRoute.affected === 0){
      throw new Error(`Can't delete route with id: ${data.id}`)
    }
    return {
      id: data.id
    }
  }
}
