import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { JobProcessorPresentationService } from './job-processor.presentation.service';

@Injectable()
export class JobsProcessorPresentationController {
  private readonly logger: Logger = new Logger(JobsProcessorPresentationController.name);

  public constructor(
    private readonly jobsProcessorPresentationService: JobProcessorPresentationService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  public async updateUserTelemetry() {
    this.logger.debug(this.updateUserTelemetry.name);
    return this.jobsProcessorPresentationService.updateUserTelemetry();
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  public async createAttachedUserQuestInRedis(){
    this.logger.log(`${this.createAttachedUserQuestInRedis.name}: Execute method`);
    return this.jobsProcessorPresentationService.createAttachedUserQuestInRedis();
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  public async finishQuests(){
    this.logger.log(`${this.finishQuests.name}: Execute method`)
    return this.jobsProcessorPresentationService.finishQuests();
  }
}
