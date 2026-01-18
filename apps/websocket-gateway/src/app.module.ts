import { Module } from '@nestjs/common';
import { WebsocketGatewayModule } from './modules/websocket.module';

@Module({
  imports: [WebsocketGatewayModule],
})
export class AppModule {}
