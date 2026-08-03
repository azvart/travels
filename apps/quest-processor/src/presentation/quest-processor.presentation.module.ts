import { Module } from '@nestjs/common';
import { QuestProcessorPresentationService } from './quest-processor.presentation.service';
import { QuestProcessorPresentationController } from './quest-processor.presentation.controller';
import { UpdateUserQuestProgressModule } from '../use-case/update-user-quest/update-user-quest-progress.module';

@Module({
  imports: [UpdateUserQuestProgressModule],
  controllers: [QuestProcessorPresentationController],
  providers: [QuestProcessorPresentationService],
})
export class QuestProcessorPresentationModule {}
