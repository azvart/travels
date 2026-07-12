import { Injectable } from '@nestjs/common';
import { ICreateRoute, IUpdateRoute, Route } from 'libs/interfaces';
import { CreateRouteHandler } from '../use-case/create-route/create-route.handler';
import { UpdateRouteHandler } from '../use-case/update-route/update-route.handler';

@Injectable()
export class RoutePresentationService {
  public constructor(
    private readonly createRouteHandler: CreateRouteHandler,
    private readonly updateRouteHandler: UpdateRouteHandler
  ) {}

  public async createRoute(input: ICreateRoute): Promise<Route> {
    return this.createRouteHandler.run(input);
  }


  public async updateRoute(input: IUpdateRoute){
    return this.updateRouteHandler.run(input);
  }
}
