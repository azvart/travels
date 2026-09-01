import { Module } from '@nestjs/common';
import { JobsProcessorPresentationController } from './jobs-processor.presentation.controller';
import { JobProcessorPresentationService } from './job-processor.presentation.service';
import { UpdateUserTelemetryModule } from '../use-case/update-user-telemetry/update-user-telemetry.module';
import {
  CreateAttachedUserQuestInRedisModule
} from '../use-case/create-attached-user-quest-in-redis/create-attached-user-quest-in-redis.module';
import { FinishQuestModule } from '../use-case/finish-quests/finish-quest.module';

@Module({
  imports: [
    UpdateUserTelemetryModule,
    CreateAttachedUserQuestInRedisModule,
    FinishQuestModule
  ],
  providers: [
    JobsProcessorPresentationController,
    JobProcessorPresentationService,
  ],
})
export class JobsProcessorPresentationModule {}
