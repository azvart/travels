import { Injectable, Logger } from '@nestjs/common';
import { JobsRepository } from '../../domain/repositories/job.repository';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class JobsQueue implements JobsRepository {
  private readonly logger: Logger = new Logger(JobsQueue.name);

  constructor(
    @InjectQueue('jobs')
    private readonly queue: Queue,
  ) {}

  public async enqueueVerifiedEmail(payload: {
    email: string;
    id: string;
    isEmailVerified: boolean;
  }) {
    await this.queue.add('verified-email', payload, {
      jobId: `verified-email-${payload.id}`,
      removeOnComplete: true,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    });
  }

  public async enqueueCalculateDestination(payload: { cardId: string }) {
    await this.queue.add('calculate-destination', payload, {
      jobId: `calculate-destination-${payload.cardId}`,
      removeOnComplete: true,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    });
  }
}
