import { Module } from '@nestjs/common';
import { UpdateExistingAccountHandler } from './update-existng-account.handler';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [UpdateExistingAccountHandler],
  exports: [UpdateExistingAccountHandler],
})
export class UpdateExistingAccountModule {}
