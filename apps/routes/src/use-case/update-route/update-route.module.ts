import { Module } from '@nestjs/common';
import { UpdateRouteHandler } from './update-route.handler';
import { RouteRepositoryModule } from '../../infrastructure/repositories/route.repository.module';

@Module({
  imports: [RouteRepositoryModule],
  providers: [UpdateRouteHandler],
  exports: [UpdateRouteHandler],
})
export class UpdateRouteModule {}
