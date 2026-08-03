import { Module } from '@nestjs/common';
import { RedisModule } from '@app/redis';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { UpdateUserTelemetryHandler } from './update-user-telemetry.handler';

@Module({
  imports: [RedisModule],
  providers: [UpdateUserTelemetryHandler],
  exports: [UpdateUserTelemetryHandler],
})
export class UpdateUserTelemetryModule {}
