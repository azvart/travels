import { Injectable } from '@nestjs/common';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class GetAccountByEmailHandler {
  constructor(
    private readonly accountGrpcService: AccountGrpcService
  ){}

  public async run(email: string){
    return firstValueFrom(
      this.accountGrpcService.service.getAccountByEmail({
        email
      })
    )
  }
}
