import { Module } from '@nestjs/common';
import { UpdateRouteHandler } from './update-route.handler';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';


@Module({
  imports: [GrpcApiClientsModule],
  providers:[UpdateRouteHandler],
  exports:[UpdateRouteHandler],
})
export class UpdateRouteModule {}
