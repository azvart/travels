import { Module } from '@nestjs/common';
import { RouteRepositoryModule } from '../../infrastructure/repositories/route.repository.module';
import { DeleteUserRouteHandler } from './delete-user-route.handler';

@Module({
  imports: [RouteRepositoryModule],
  providers: [DeleteUserRouteHandler],
  exports: [DeleteUserRouteHandler],
})
export class DeleteUserRouteModule {}
