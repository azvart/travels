import { Module } from '@nestjs/common';
import { EmailVerifiedService } from './application/email-verified.service';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { CalculateDestinationService } from './application/calculate-destination.service';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [EmailVerifiedService, CalculateDestinationService],
  exports: [EmailVerifiedService, CalculateDestinationService],
})
export class DomainsModule {}
