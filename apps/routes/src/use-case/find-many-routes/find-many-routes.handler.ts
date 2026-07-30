import { Injectable } from '@nestjs/common';
import { RouteAbstractRepository } from '../../infrastructure/repositories/route.abstract.repository';
import { IFindManyRoutes } from 'libs/interfaces';


@Injectable()
export class FindManyRoutesHandler {

  public constructor(
    private readonly routeRepositoryService: RouteAbstractRepository
  ){}

  public async run(data: IFindManyRoutes & { userId: string }){
    const routes = await this.routeRepositoryService.findManyRoutes(data);

    return {
      routes
    }
  }
}
