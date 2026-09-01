import { Module } from '@nestjs/common';
import { UserTelemetrySubscriptionHandler } from './user-telemetry-subscription.handler';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConsumersGroupsEnum } from 'libs/interfaces/kafka';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_TELEMETRY_KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          postfixId: '',
          client: {
            clientId: KafkaConsumersGroupsEnum.USER_PROCESSOR,
            brokers: ['localhost:9092'],
            consumer: {
              groupId: KafkaConsumersGroupsEnum.USER_PROCESSOR,
            },
          },
        },
      },
    ]),
  ],
  providers: [UserTelemetrySubscriptionHandler],
  exports: [UserTelemetrySubscriptionHandler],
})
export class UserTelemetrySubscriptionModule {}
