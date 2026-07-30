import { Injectable } from '@nestjs/common';
import { RouteAbstractRepository } from '../../infrastructure/repositories/route.abstract.repository';
import { IDeleteUserRoute } from 'libs/interfaces';


@Injectable()
export class DeleteUserRouteHandler {


  public constructor(
    private readonly routeRepositoryService: RouteAbstractRepository
  ){}

  public async run(data: IDeleteUserRoute & { userId: string }){
    return this.routeRepositoryService.deleteUserRoute(data);
  }

}
