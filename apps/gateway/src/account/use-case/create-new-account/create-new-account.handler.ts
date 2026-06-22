import { Injectable } from '@nestjs/common';
import { ICreateNewAccount } from 'libs/interfaces/account/create-new-account.interface';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CreateNewAccountHandler {
  public constructor(public readonly accountGrpcService: AccountGrpcService) {}

  public async run(input: ICreateNewAccount) {
    return firstValueFrom(this.accountGrpcService.service.createNewAccount(input));
  }
}
