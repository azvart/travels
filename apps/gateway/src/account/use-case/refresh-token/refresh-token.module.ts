import { Module } from '@nestjs/common';
import { RefreshTokenHandler } from './refresh-token.handler';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';


@Module({
  imports: [GrpcApiClientsModule],
  providers: [RefreshTokenHandler],
  exports: [RefreshTokenHandler]
})
export class RefreshTokenModule {}
