import { Injectable } from '@nestjs/common';
import { AuthSocketService } from '../application/auth-socket.service';
import { Socket } from 'socket.io';
import { SOCKET_ROOMS } from '@app/types';

@Injectable()
export class AuthSocketHandler {
  public constructor(private readonly authSocketService: AuthSocketService) {}

  public async handle(
    event: string,
    payload: Record<string, unknown>,
    socket: Socket,
  ) {
    switch (event) {
      case 'login': {
        return this.login(payload, socket);
      }
    }
  }

  public async login(input: any, socket: Socket) {
    const auth = await this.authSocketService.login(input, socket);
    await socket.join(SOCKET_ROOMS.forUser({ userId: auth.userId }));
    return true;
  }
}
