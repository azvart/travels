import { Module } from '@nestjs/common';
import { RouteRepositoryModule } from '../../infrastructure/repositories/route.repository.module';
import { CreateRouteHandler } from './create-route.handler';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';

@Module({
  imports: [RouteRepositoryModule, GrpcApiClientsModule],
  providers: [CreateRouteHandler],
  exports: [CreateRouteHandler],
})
export class CreateRouteModule {}
