import { Socket } from 'socket.io';

export interface SocketEventHandler {
  handle(
    event: string,
    payload: Record<string, unknown>,
    socket: Socket,
  ): Promise<unknown>;
}
