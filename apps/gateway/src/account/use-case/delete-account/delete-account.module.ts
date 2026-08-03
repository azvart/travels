import { Module } from '@nestjs/common';
import { DeleteAccountHandler } from './delete-account.handler';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [DeleteAccountHandler],
  exports: [DeleteAccountHandler],
})
export class DeleteAccountModule {}
