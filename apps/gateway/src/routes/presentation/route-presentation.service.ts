import { Injectable } from '@nestjs/common';
import {
  ICreateRoute,
  IDeleteUserRoute,
  IFindManyRoutes,
  IFindOneRoute,
  IGetUser,
  IUpdateRoute,
  Route,
} from 'libs/interfaces';
import { CreateRouteHandler } from '../use-case/create-route/create-route.handler';
import { UpdateRouteHandler } from '../use-case/update-route/update-route.handler';
import { FindManyRoutesHandler } from '../use-case/find-many-routes/find-many-routes.handler';
import { FindOneRouteHandler } from '../use-case/find-one-route/find-one-route.handler';
import { DeleteUserRouteHandler } from '../use-case/delete-user-route/delete-user-route.handler';

@Injectable()
export class RoutePresentationService {
  public constructor(
    private readonly createRouteHandler: CreateRouteHandler,
    private readonly updateRouteHandler: UpdateRouteHandler,
    private readonly findManyRoutesHandler: FindManyRoutesHandler,
    private readonly findOneRouteHandler: FindOneRouteHandler,
    private readonly deleteUserRouteHandler: DeleteUserRouteHandler
  ) {}

  public async createRoute(input: ICreateRoute): Promise<Route> {
    return this.createRouteHandler.run(input);
  }


  public async updateRoute(input: IUpdateRoute){
    return this.updateRouteHandler.run(input);
  }

  public async findManyRoutes(input: IFindManyRoutes, user: IGetUser){
    return this.findManyRoutesHandler.run({
      ...input,
      userId: user.userId
    });
  }

  public async findOneRoute(input: IFindOneRoute){
    return this.findOneRouteHandler.run(input);
  }

  public async deleteUserRoute(input: IDeleteUserRoute, user: IGetUser){
    return this.deleteUserRouteHandler.run({
      ...input,
      userId: user.userId
    });
  }
}
