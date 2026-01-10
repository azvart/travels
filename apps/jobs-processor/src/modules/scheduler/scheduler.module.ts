import { Module } from '@nestjs/common';
import { JobsModule } from '../queues/jobs.module';
import { SchedulerService } from './application/scheduler.service';
import { RedisModule } from '@app/redis';

@Module({
  imports: [JobsModule, RedisModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
