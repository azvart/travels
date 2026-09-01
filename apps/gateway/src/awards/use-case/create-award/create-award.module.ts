import { Module } from '@nestjs/common';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { CreateAwardHandler } from './create-award.handler';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [CreateAwardHandler],
  exports: [CreateAwardHandler],
})
export class CreateAwardModule {}
