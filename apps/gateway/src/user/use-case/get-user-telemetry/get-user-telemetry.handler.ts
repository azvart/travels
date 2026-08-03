import { Injectable } from '@nestjs/common';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { IGetUser } from 'libs/interfaces';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class GetUserTelemetryHandler {

  public constructor(
    private readonly accountGrpcService: AccountGrpcService
  ){}

  public async run(user: IGetUser, routeId: string){
    return firstValueFrom(this.accountGrpcService.service.getUserTelemetry({
      userId: user.userId,
      routeId
    }));
  }

}
