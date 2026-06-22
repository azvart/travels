import { Injectable } from '@nestjs/common';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GetAccountHandler {
  public constructor(private readonly accountGrpcService:AccountGrpcService) {}

  public async run(id: string) {
   return firstValueFrom(
     this.accountGrpcService.service.getAccount({
       id
     })
   )
  }
}
