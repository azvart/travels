import { Module } from '@nestjs/common';
import { WebsocketGatewayModule } from './modules/websocket.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    WebsocketGatewayModule,
    ClientsModule.register([
      {
        name: 'WEATHER_PROCESSOR',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'weather-client',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'weather-consumer',
          },
        },
      },
    ]),
  ],
})
export class AppModule {}
