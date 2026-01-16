import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailVerifiedService } from '../../domains/application/email-verified.service';
import { CalculateDestinationService } from '../../domains/application/calculate-destination.service';

@Processor('jobs')
export class JobsProcessor extends WorkerHost {
  constructor(
    private readonly verifiedEmailService: EmailVerifiedService,
    private readonly calculateDestinationService: CalculateDestinationService,
  ) {
    super();
  }

  async process(job: Job) {
    if (job.name === 'verified-email') {
      return this.verifiedEmailService.verifyEmail(job.data);
    }
    if (job.name === 'calculate-destination') {
      return this.calculateDestinationService.calculateDestinationFromCard(
        job.data,
      );
    }
  }
}
