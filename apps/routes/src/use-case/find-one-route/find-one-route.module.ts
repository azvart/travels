import { Module } from '@nestjs/common';
import { RouteRepositoryModule } from '../../infrastructure/repositories/route.repository.module';
import { FindOneRouteHandler } from './find-one-route.handler';


@Module({
  imports: [RouteRepositoryModule],
  exports: [FindOneRouteHandler],
  providers: [FindOneRouteHandler]
})
export class FindOneRouteModule {}
