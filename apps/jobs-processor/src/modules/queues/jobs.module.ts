import { Module } from '@nestjs/common';
import { DomainsModule } from '../domains/domains.module';
import { JobsQueue } from './infrastructure/persistense/jobs.queue';
import { JobsProcessor } from './application/jobs.processor';

@Module({
  imports: [DomainsModule],
  providers: [JobsQueue, JobsProcessor],
  exports: [JobsQueue, JobsProcessor],
})
export class JobsModule {}
