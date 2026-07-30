import { Injectable } from '@nestjs/common';
import { RouteAbstractRepository } from '../../infrastructure/repositories/route.abstract.repository';
import { IFindOneRoute } from 'libs/interfaces';


@Injectable()
export class FindOneRouteHandler {

  public constructor(
    private readonly routeRepositoryService: RouteAbstractRepository
  ){}

  public async run(data: IFindOneRoute){
    return this.routeRepositoryService.findOneRoute(data);
  }
}
