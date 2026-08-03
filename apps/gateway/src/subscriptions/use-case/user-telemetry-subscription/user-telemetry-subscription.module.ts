import { Module } from '@nestjs/common';
import { UserTelemetrySubscriptionHandler } from './user-telemetry-subscription.handler';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_TELEMETRY_KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user-processor',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-processor',
          },
        },
      },
    ]),
  ],
  providers: [UserTelemetrySubscriptionHandler],
  exports: [UserTelemetrySubscriptionHandler],
})
export class UserTelemetrySubscriptionModule {}
