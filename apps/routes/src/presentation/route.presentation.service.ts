import { Injectable } from '@nestjs/common';
import { CreateRouteHandler } from '../use-case/create-route/create-route.handler';
import {
  ICreateRoute,
  IDeleteUserRoute,
  IFindManyRoutes,
  IFindOneRoute,
  IUpdateRoute,
} from 'libs/interfaces';
import { UpdateRouteHandler } from '../use-case/update-route/update-route.handler';
import { DeleteUserRouteHandler } from '../use-case/delete-user-route/delete-user-route.handler';
import { FindOneRouteHandler } from '../use-case/find-one-route/find-one-route.handler';
import { FindManyRoutesHandler } from '../use-case/find-many-routes/find-many-routes.handler';

@Injectable()
export class RoutePresentationService {
  public constructor(
    private readonly createRouteHandler: CreateRouteHandler,
    private readonly updateRouteHandler: UpdateRouteHandler,
    private readonly deleteUserRouteHandler: DeleteUserRouteHandler,
    private readonly findOneRouteHandler: FindOneRouteHandler,
    private readonly findManyRoutesHandler: FindManyRoutesHandler,
  ) {}

  public async createRoute(data: ICreateRoute) {
    return this.createRouteHandler.run(data);
  }

  public async updateRoute(data: IUpdateRoute) {
    return this.updateRouteHandler.run(data);
  }
  public async findOneRoute(data: IFindOneRoute) {
    return this.findOneRouteHandler.run(data);
  }

  public async findManyRoutes(data: IFindManyRoutes & { userId: string }) {
    return this.findManyRoutesHandler.run(data);
  }

  public async deleteUserRoute(data: IDeleteUserRoute & { userId: string }) {
    return this.deleteUserRouteHandler.run(data);
  }
}
