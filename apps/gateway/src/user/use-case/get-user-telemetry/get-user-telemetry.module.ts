import { Module } from '@nestjs/common';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { GetUserTelemetryHandler } from './get-user-telemetry.handler';


@Module({
  imports: [GrpcApiClientsModule],
  providers: [GetUserTelemetryHandler],
  exports: [GetUserTelemetryHandler]
})
export class GetUserTelemetryModule {}
