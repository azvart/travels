import { Module } from '@nestjs/common';
import { CreateNewAccountHandler } from './create-new-account.handler';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [CreateNewAccountHandler],
  exports: [CreateNewAccountHandler],
})
export class CreateNewAccountModule {}
