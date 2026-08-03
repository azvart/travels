import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from '@app/redis';
import { AppConfigModule } from '@app/app-config';
import { JobsProcessorPresentationModule } from './presentation/jobs-processor.presentation.module';

@Module({
  imports: [
    AppConfigModule.forRootAsync(),
    ScheduleModule.forRoot(),
    RedisModule,
    JobsProcessorPresentationModule,
  ],
})
export class AppModule {}
