import { Injectable } from '@nestjs/common';
import { IUpdateRoute } from 'libs/interfaces';
import { RouteGrpcService } from '@app/grpc-api-clients';


@Injectable()
export class UpdateRouteHandler {

  public constructor(
    private readonly routeGrpcService: RouteGrpcService
  ){}



  public async run(input: IUpdateRoute){
    return this.routeGrpcService.service.updateRoute(input);
  }
}
