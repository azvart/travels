import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { JobsQueue } from '../../queues/infrastructure/persistense/jobs.queue';
import { AccountsRedisService } from '@app/redis';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly jobsQueue: JobsQueue,
    private readonly accountsRedisService: AccountsRedisService,
  ) {}

  @Interval(10000)
  async checkIsVerifiedEmail() {
    const data = await this.accountsRedisService.getAllAccounts<{
      id: string;
      email: string;
      isEmailVerified: boolean;
    }>();
    await Promise.all([
      ...data.map((account) => this.jobsQueue.enqueueVerifiedEmail(account)),
    ]);
  }

  async checkCalculatedDestination() {}
}
