import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RouteGrpcService } from '@app/grpc-api-clients';
import { IDeleteUserRoute } from 'libs/interfaces';

@Injectable()
export class DeleteUserRouteHandler {

  public constructor(
    private readonly routeGrpcService: RouteGrpcService
  ){}


  public async run(data: IDeleteUserRoute & { userId: string }){
    return firstValueFrom(this.routeGrpcService.service.deleteUserRoute(data))
  }
}
