import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { JobsProcessorPresentationController } from './jobs-processor.presentation.controller';
import { JobsProcessorPresentationProcessorService } from './jobs-processor.presentation.processor.service';
import { QuestProgressModule } from '../use-case/quest-progress/quest-progress.module';
import { JobProcessorPresentationService } from './job-processor.presentation.service';
import { QuestProgressActionModule } from '../processor-actions/quest-progress.action.module';
import { FinishedQuestModule } from '../use-case/finished-quest/finished-quest.module';


@Module({
  imports: [
    QuestProgressModule,
    QuestProgressActionModule,
  ],
  providers:[
    JobsProcessorPresentationController,
    JobsProcessorPresentationProcessorService,
    JobProcessorPresentationService
  ],
})
export class JobsProcessorPresentationModule {}
