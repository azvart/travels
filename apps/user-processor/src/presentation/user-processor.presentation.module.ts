import { Module } from '@nestjs/common';
import { UserProcessorPresentationController } from './user-processor.presentation.controller';
import { UserProcessorPresentationService } from './user-processor.presentation.service';
import { UpdateUserTelemetryModule } from '../use-case/update-user-telemetry/update-user-telemetry.module';


@Module({
  imports: [UpdateUserTelemetryModule],
  controllers: [UserProcessorPresentationController],
  providers: [UserProcessorPresentationService]
})
export class UserProcessorPresentationModule {}
