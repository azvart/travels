import { Injectable } from '@nestjs/common';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';
import { IGetUser } from 'libs/interfaces';

@Injectable()
export class GetUserFullHandler {
  public constructor(private readonly accountGrpcService: AccountGrpcService) {}

  public async run(data: IGetUser) {
    return firstValueFrom(
      this.accountGrpcService.service.getUser({
        ...data,
      }),
    );
  }
}
