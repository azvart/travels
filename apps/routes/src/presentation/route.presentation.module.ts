import { Module } from '@nestjs/common';
import { RoutePresentationController } from './route.presentation.controller';
import { RoutePresentationService } from './route.presentation.service';
import { CreateRouteModule } from '../use-case/create-route/create-route.module';
import { UpdateRouteModule } from '../use-case/update-route/update-route.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteOrmEntity } from '../infrastructure/repositories/route.entity';
import { DeleteUserRouteModule } from '../use-case/delete-user-route/delete-user-route.module';
import { FindOneRouteModule } from '../use-case/find-one-route/find-one-route.module';
import { FindManyRoutesModule } from '../use-case/find-many-routes/find-many-routes.module';

@Module({
  imports: [
    CreateRouteModule,
    UpdateRouteModule,
    DeleteUserRouteModule,
    FindOneRouteModule,
    FindManyRoutesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 54321,
      username: 'root',
      password: 'root_password',
      database: 'travels',
      entities: [RouteOrmEntity],
      synchronize: true,
    }),
  ],
  controllers: [RoutePresentationController],
  providers: [RoutePresentationService],
})
export class RoutePresentationModule {}
