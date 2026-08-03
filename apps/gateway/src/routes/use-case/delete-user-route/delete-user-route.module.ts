import { Module } from '@nestjs/common';
import { DeleteUserRouteHandler } from './delete-user-route.handler';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [DeleteUserRouteHandler],
  exports: [DeleteUserRouteHandler],
})
export class DeleteUserRouteModule {}
