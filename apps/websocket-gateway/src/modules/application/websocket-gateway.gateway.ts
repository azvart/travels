import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthSocketHandler } from '../handlers/auth-socket-handler.event';
import { SocketEventHandler } from '../domain/socket-event.handler';
import { SocketEvent } from '@app/types';
import { SocketEventNamespace } from '@app/types/socket-event/socket-event-namespace.type';

@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class WebsocketGatewayProvider {
  @WebSocketServer()
  server: Server;

  public constructor(
    public readonly authSocketEventHandler: AuthSocketHandler,
  ) {}

  @SubscribeMessage('event')
  public handleSocketEvent(
    @MessageBody() data: SocketEvent,
    @ConnectedSocket() socket: Socket,
  ): Promise<unknown> {
    const handlers = {
      [SocketEventNamespace.AUTH]: () =>
        this.authSocketEventHandler.handle(data.event, data.payload, socket),
    };

    const handler = handlers[data.namespace];
    if (!handler) {
      throw new Error(
        `Unknown namespace [${data.namespace as string}] for event [${data.event}]`,
      );
    }

    return handler();
  }
}
