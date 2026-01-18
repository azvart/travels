import { Module } from '@nestjs/common';
import { WebsocketGatewayProvider } from './application/websocket-gateway.gateway';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { AuthSocketHandler } from './handlers/auth-socket-handler.event';
import { AuthSocketService } from './application/auth-socket.service';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [WebsocketGatewayProvider, AuthSocketHandler, AuthSocketService],
})
export class WebsocketGatewayModule {}
