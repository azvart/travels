import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AccountGrpcService } from '@app/grpc-api-clients';

@Injectable()
export class DeleteAccountHandler {
  public constructor(private readonly accountGrpcService: AccountGrpcService) {}

  public async run(id: string) {
    return firstValueFrom(
      this.accountGrpcService.service.deleteAccount({
        accountId: id,
      }),
    );
  }
}
