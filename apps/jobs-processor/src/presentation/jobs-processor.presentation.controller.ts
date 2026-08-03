import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { JobProcessorPresentationService } from './job-processor.presentation.service';


@Injectable()
export class JobsProcessorPresentationController {

  private readonly logger:Logger = new Logger(JobsProcessorPresentationController.name);

  public constructor(
    private readonly jobsProcessorPresentationService:JobProcessorPresentationService
  ){}


  @Cron(CronExpression.EVERY_30_SECONDS)
  public async questProgress(){
    this.logger.debug(`${this.questProgress.name}:Execute method`)
    return this.jobsProcessorPresentationService.questProgress();
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  public async updateUserTelemetry(){
    this.logger.debug(this.updateUserTelemetry.name)
      return this.jobsProcessorPresentationService.updateUserTelemetry();
  }

}
