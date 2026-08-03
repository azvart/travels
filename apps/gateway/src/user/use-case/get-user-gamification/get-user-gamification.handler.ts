import { Injectable } from '@nestjs/common';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { IGetUser } from 'libs/interfaces';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class GetUserGamificationHandler {

  public constructor(
    private readonly accountGrpcService: AccountGrpcService
  ){}

  public async run(user:IGetUser){
    return firstValueFrom(this.accountGrpcService.service.getUserGamification(user));
  }

}
