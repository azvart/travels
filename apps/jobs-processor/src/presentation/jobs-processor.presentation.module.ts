import { Module } from '@nestjs/common';
import { JobsProcessorPresentationController } from './jobs-processor.presentation.controller';
import { JobsProcessorPresentationProcessorService } from './jobs-processor.presentation.processor.service';
import { QuestProgressModule } from '../use-case/quest-progress/quest-progress.module';
import { JobProcessorPresentationService } from './job-processor.presentation.service';
import { QuestProgressActionModule } from '../processor-actions/quest-progress.action.module';
import { UpdateUserTelemetryModule } from '../use-case/update-user-telemetry/update-user-telemetry.module';

@Module({
  imports: [QuestProgressModule, QuestProgressActionModule, UpdateUserTelemetryModule],
  providers: [
    JobsProcessorPresentationController,
    JobsProcessorPresentationProcessorService,
    JobProcessorPresentationService,
  ],
})
export class JobsProcessorPresentationModule {}
