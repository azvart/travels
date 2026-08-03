import { Module } from '@nestjs/common';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { GetUserGamificationHandler } from './get-user-gamification.handler';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [GetUserGamificationHandler],
  exports: [GetUserGamificationHandler],
})
export class GetUserGamificationModule {}
