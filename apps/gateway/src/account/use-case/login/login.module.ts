import { Module } from '@nestjs/common';
import { LoginHandler } from './login.handler';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [LoginHandler],
  exports: [LoginHandler],
})
export class LoginModule {}
