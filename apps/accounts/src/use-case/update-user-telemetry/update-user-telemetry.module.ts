import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../../infrastructure/user';
import { UpdateUserTelemetryHandler } from './update-user-telemetry.handler';

@Module({
  imports: [UserRepositoryModule],
  providers: [UpdateUserTelemetryHandler],
  exports: [UpdateUserTelemetryHandler],
})
export class UpdateUserTelemetryModule {}
