import { Module } from '@nestjs/common';
import { RedisModule } from '@app/redis';
import { UpdateUserTelemetryHandler } from './update-user-telemetry.handler';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConsumersGroupsEnum } from 'libs/interfaces/kafka';

@Module({
  imports: [
    RedisModule,
    ClientsModule.register([
      {
        name: 'USER_QUEST_KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          postfixId: '',
          client: {
            clientId: KafkaConsumersGroupsEnum.QUEST_PROCESSOR,
            brokers: ['localhost:9092'],
            consumer: {
              groupId: KafkaConsumersGroupsEnum.QUEST_PROCESSOR
            }
          }
        }
      },
    ]),
  ],
  providers: [UpdateUserTelemetryHandler],
  exports: [UpdateUserTelemetryHandler],
})
export class UpdateUserTelemetryModule {}
