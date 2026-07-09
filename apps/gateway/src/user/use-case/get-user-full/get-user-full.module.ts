import { Module } from '@nestjs/common';
import { GetUserFullHandler } from './get-user-full.handler';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';


@Module({
  imports: [GrpcApiClientsModule],
  providers: [GetUserFullHandler],
  exports: [GetUserFullHandler]
})
export class GetUserFullModule {}
