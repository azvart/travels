import { Module } from '@nestjs/common';
import { RouteAbstractRepository } from './route.abstract.repository';
import { RouteRepository } from './route.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteOrmEntity } from './route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RouteOrmEntity])],
  providers: [
    {
      provide: RouteAbstractRepository,
      useClass: RouteRepository,
    },
  ],
  exports: [
    {
      provide: RouteAbstractRepository,
      useClass: RouteRepository,
    },
  ],
})
export class RouteRepositoryModule {}
