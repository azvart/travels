import { Injectable } from '@nestjs/common';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GetUserFullHandler {

  public constructor(
    private readonly accountGrpcService: AccountGrpcService
  ){}



  public async run(userId:string){
    return firstValueFrom(
      this.accountGrpcService.service.userFull({
        userId
      }),
    )
  }
}
