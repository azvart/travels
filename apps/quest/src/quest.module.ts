import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/app-config';
import { QuestPresentationModule } from './presentation/quest.presentation.module';
import { RedisModule, UserQuestService } from '@app/redis';

@Module({
  imports: [AppConfigModule.forRootAsync(), QuestPresentationModule],
  controllers: [],
  providers: [],
})
export class QuestModule {}
