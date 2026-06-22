import { Module } from '@nestjs/common';
import { GetAccountHandler } from './get-account.handler';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';


@Module({
  imports: [
    GrpcApiClientsModule,
  ],
  providers: [GetAccountHandler],
  exports: [GetAccountHandler],
})
export class GetAccountModule {}
