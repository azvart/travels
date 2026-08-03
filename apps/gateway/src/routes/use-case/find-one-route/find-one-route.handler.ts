import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RouteGrpcService } from '@app/grpc-api-clients';
import { IFindOneRoute } from 'libs/interfaces';

@Injectable()
export class FindOneRouteHandler {
  public constructor(private readonly routeGrpcService: RouteGrpcService) {}

  public async run(data: IFindOneRoute) {
    return firstValueFrom(this.routeGrpcService.service.findOneRoute(data));
  }
}
