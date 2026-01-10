import { Module } from '@nestjs/common';
import { AccountGrpcService } from '@app/grpc-api-clients/account';

@Module({
  providers: [AccountGrpcService],
  exports: [AccountGrpcService],
})
export class GrpcApiClientsModule {}
