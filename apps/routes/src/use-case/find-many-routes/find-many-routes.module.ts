import { Module } from '@nestjs/common';
import { RouteRepositoryModule } from '../../infrastructure/repositories/route.repository.module';
import { FindManyRoutesHandler } from './find-many-routes.handler';

@Module({
  imports: [RouteRepositoryModule],
  exports: [FindManyRoutesHandler],
  providers: [FindManyRoutesHandler],
})
export class FindManyRoutesModule {}
