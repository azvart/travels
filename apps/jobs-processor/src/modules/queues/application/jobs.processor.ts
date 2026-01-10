import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailVerifiedService } from '../../domains/application/email-verified.service';

@Processor('jobs')
export class JobsProcessor extends WorkerHost {
  constructor(private readonly verifiedEmailService: EmailVerifiedService) {
    super();
  }

  async process(job: Job) {
    if (job.name === 'verified-email') {
      return this.verifiedEmailService.verifyEmail(job.data);
    }
  }
}
