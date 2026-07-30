import { Module } from '@nestjs/common';
import { FindOneRouteHandler } from './find-one-route.handler';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';


@Module({
  imports: [GrpcApiClientsModule],
  providers: [FindOneRouteHandler],
  exports: [FindOneRouteHandler]
})
export class FindOneRouteModule {}
