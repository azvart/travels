import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../../infrastructure/user';
import { CreateUserTelemetryHandler } from './create-user-telemetry.handler';


@Module({
  imports: [UserRepositoryModule],
  providers: [CreateUserTelemetryHandler],
  exports: [CreateUserTelemetryHandler],
})
export class CreateUserTelemetryModule {}
