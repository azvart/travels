import { Module } from '@nestjs/common';
import { GetAccountByEmailHandler } from './get-account-by-email.handler';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';


@Module({
  imports:[
    GrpcApiClientsModule
  ],
  providers: [GetAccountByEmailHandler],
  exports: [GetAccountByEmailHandler],
})
export class GetAccountByEmailModule {}
