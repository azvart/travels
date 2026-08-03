import { Module } from '@nestjs/common';
import { GetUserTelemetryHandler } from './get-user-telemetry.handler';
import { UserRepositoryModule } from '../../infrastructure/user';


@Module({
  imports: [UserRepositoryModule],
  providers: [GetUserTelemetryHandler],
  exports: [GetUserTelemetryHandler],
})
export class GetUserTelemetryModule {}
