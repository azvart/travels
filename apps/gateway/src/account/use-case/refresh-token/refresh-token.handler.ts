import { Injectable } from '@nestjs/common';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RefreshTokenHandler {

  public constructor(
    private readonly accountGrpcService: AccountGrpcService
  ){}


  public async run(refreshToken: string){
    return firstValueFrom(this.accountGrpcService.service.refreshToken({
      refreshToken
    }))
  }

}
