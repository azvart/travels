import { Injectable } from '@nestjs/common';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { IUpdateUserInputInterface } from 'libs/interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UpdateUserHandler {
  public constructor(private readonly accountGrpcService: AccountGrpcService) {}

  public async run(input: IUpdateUserInputInterface) {
    return firstValueFrom(this.accountGrpcService.service.updateUser(input));
  }
}
