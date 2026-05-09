import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JobsQueue } from '../repositories/jobs.queue';
import { AccountsRedisService } from '@app/redis';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly jobsQueue: JobsQueue,
    private readonly accountsRedisService: AccountsRedisService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
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

  @Cron(CronExpression.EVERY_30_SECONDS)
  public async runWeatherData() {
    await this.jobsQueue.enqueueWeatherData();
  }
}
