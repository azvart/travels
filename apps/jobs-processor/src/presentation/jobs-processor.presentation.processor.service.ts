import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { JobsEnum } from './interfaces';
import { QuestProgressAction } from '../processor-actions/quest-progress.action';




@Processor('jobs')
export class JobsProcessorPresentationProcessorService extends WorkerHost {

  private readonly logger: Logger = new Logger(JobsProcessorPresentationProcessorService.name);

  public constructor(
    private readonly questProgressAction: QuestProgressAction
  ){
    super()
  }

  async process(job: Job){
    switch (job.name){
      case JobsEnum.QUEST_PROGRESS: {
        this.logger.debug(`Execute ${JobsEnum.QUEST_PROGRESS}`);
        return this.questProgressAction.run(job.data);
      }
    }
  }
}
