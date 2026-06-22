import { Module } from '@nestjs/common';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { UpdateUserHandler } from './update-user.handler';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [UpdateUserHandler],
  exports: [UpdateUserHandler],
})
export class UpdateUserModule {}
