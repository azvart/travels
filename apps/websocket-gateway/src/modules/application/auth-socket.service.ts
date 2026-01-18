import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AccountGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';
import { USER_INJECT_KEY } from '@app/types';

@Injectable()
export class AuthSocketService {
  public constructor(public readonly accountGrpcService: AccountGrpcService) {}

  public async login({ token }: { token: string }, socket: Socket) {
    const auth = await firstValueFrom(
      this.accountGrpcService.service.loginByToken({ token }),
    );

    socket.data[USER_INJECT_KEY] = auth;

    return auth;
  }
}
