import { Injectable } from '@nestjs/common';
import { ICreateRoute, Route } from 'libs/interfaces';
import { CreateRouteHandler } from '../use-case/create-route/create-route.handler';


@Injectable()
export class RoutePresentationService {
  public constructor(private readonly createRouteHandler: CreateRouteHandler) {}

  public async createRoute(input: ICreateRoute): Promise<Route> {
    return this.createRouteHandler.run(input);
  }
}
