import { Module } from '@nestjs/common';
import { JobsQueue } from '../repositories/jobs.queue';
import { JobsProcessor } from '../services/jobs.processor';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { EmailVerifiedService } from '../services/email-verified.service';
import { CalculateDestinationService } from '../services/calculate-destination.service';
import { RunWeatherDataService } from '../services/run-weather-data.service';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [
    JobsQueue,
    JobsProcessor,
    EmailVerifiedService,
    CalculateDestinationService,
    RunWeatherDataService,
  ],
  exports: [
    JobsQueue,
    JobsProcessor,
    EmailVerifiedService,
    CalculateDestinationService,
    RunWeatherDataService,
  ],
})
export class JobsModule {}
