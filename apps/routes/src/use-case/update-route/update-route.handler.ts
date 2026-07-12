import { Injectable } from '@nestjs/common';
import { IUpdateRoute } from 'libs/interfaces';
import { RouteAbstractRepository } from '../../infrastructure/repositories/route.abstract.repository';


@Injectable()
export class UpdateRouteHandler {

  public constructor(
    private readonly routeRepository:RouteAbstractRepository
  ){}


  public async run(data: IUpdateRoute){
     return this.routeRepository.updateByIdAndFetch(data.id, {
       routeName: data.routeName,
       userId: data.userId
    })
  }
}
