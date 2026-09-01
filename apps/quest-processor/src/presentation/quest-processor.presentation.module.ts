import { Module } from '@nestjs/common';
import { QuestProcessorPresentationService } from './quest-processor.presentation.service';
import { QuestProcessorPresentationController } from './quest-processor.presentation.controller';
import { UpdateUserQuestProgressModule } from '../use-case/update-user-quest/update-user-quest-progress.module';
import { QuestStepsProgressModule } from '../use-case/quest-steps-progress/quest-steps-progress.module';
import { QuestDurationProgressModule } from '../use-case/quest-duration-progress/quest-duration-progress.module';
import { QuestRoutesProgressModule } from '../use-case/quest-routes-progress/quest-routes-progress.module';

@Module({
  imports: [
    UpdateUserQuestProgressModule,
    QuestStepsProgressModule,
    QuestDurationProgressModule,
    QuestRoutesProgressModule
  ],
  controllers: [QuestProcessorPresentationController],
  providers: [QuestProcessorPresentationService],
})
export class QuestProcessorPresentationModule {}
