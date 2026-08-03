import { Injectable } from '@nestjs/common';
import { RouteGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';
import { IFindManyRoutes } from 'libs/interfaces';

@Injectable()
export class FindManyRoutesHandler {
  public constructor(private readonly routeGrpcService: RouteGrpcService) {}

  public async run(data: IFindManyRoutes & { userId: string }) {
    return (await firstValueFrom(this.routeGrpcService.service.findManyRoutes(data))).routes;
  }
}
