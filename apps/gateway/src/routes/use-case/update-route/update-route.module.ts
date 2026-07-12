import { Module } from '@nestjs/common';
import { UpdateRouteHandler } from './update-route.handler';


@Module({
  providers:[UpdateRouteHandler],
  exports:[UpdateRouteHandler],
})
export class UpdateRouteModule {}
