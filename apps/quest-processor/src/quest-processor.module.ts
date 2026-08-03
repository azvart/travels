import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/app-config';
import { QuestProcessorPresentationModule } from './presentation';
import { RedisModule } from '@app/redis';

@Module({
  imports: [AppConfigModule.forRootAsync(), QuestProcessorPresentationModule, RedisModule],
})
export class QuestProcessorModule {}
