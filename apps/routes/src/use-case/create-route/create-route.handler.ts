import { Injectable } from '@nestjs/common';
import { ICreateRoute } from 'libs/interfaces';
import { RouteAbstractRepository } from '../../infrastructure/repositories/route.abstract.repository';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CreateRouteHandler {
  public constructor(
    private readonly routeRepository: RouteAbstractRepository,
    private readonly accountGrpcService: AccountGrpcService,
  ) {}

  public async run(data: ICreateRoute) {
    const newRoute = await this.routeRepository.create(data);
    if (!newRoute) {
      throw new Error("Can't create route");
    }
    await firstValueFrom(
      this.accountGrpcService.service.createUserTelemetry({
        userId: data.userId,
        routeId: newRoute.id,
      }),
    );
    await firstValueFrom(
      this.accountGrpcService.service.updateUserStatistic({
        userId: data.userId,
        data: {
          createdRoutes: 1
        }
      })
    )
    return newRoute;
  }
}
