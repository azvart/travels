import { Module } from '@nestjs/common';
import { CreateRouteHandler } from './create-route.handler';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [CreateRouteHandler],
  exports: [CreateRouteHandler],
})
export class CreateRouteModule {}
