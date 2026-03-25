import { Module } from '@nestjs/common';
import { JobsModule } from './jobs.module';
import { SchedulerService } from '../services/scheduler.service';
import { RedisModule } from '@app/redis';

@Module({
  imports: [JobsModule, RedisModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
