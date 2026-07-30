import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RoutePresentationService } from './route.presentation.service';
import { ICreateRoute, IDeleteUserRoute, IFindManyRoutes, IFindOneRoute, IUpdateRoute } from 'libs/interfaces';

@Controller()
export class RoutePresentationController {
  public constructor(private readonly routePresentationService: RoutePresentationService) {}

  @GrpcMethod('Route', 'createRoute')
  public async createRoute(data: ICreateRoute) {
    return this.routePresentationService.createRoute(data);
  }

  @GrpcMethod('Route', 'updateRoute')
  public async updateRoute(data: IUpdateRoute) {
    return this.routePresentationService.updateRoute(data);
  }

  @GrpcMethod('Route', 'findManyRoutes')
  public async findManyRoutes(data: IFindManyRoutes & { userId: string }){
    return this.routePresentationService.findManyRoutes(data);
  }

  @GrpcMethod('Route', 'findOneRoute')
  public async findOneRoute(data: IFindOneRoute){
    return this.routePresentationService.findOneRoute(data);
  }

  @GrpcMethod('Route', 'deleteUserRoute')
  public async deleteUserRoute(data: IDeleteUserRoute & { userId: string }){
    return this.routePresentationService.deleteUserRoute(data);
  }
}
