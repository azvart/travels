import { Module } from '@nestjs/common';
import { EmailVerifiedService } from './application/email-verified.service';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [EmailVerifiedService],
  exports: [EmailVerifiedService],
})
export class DomainsModule {}
