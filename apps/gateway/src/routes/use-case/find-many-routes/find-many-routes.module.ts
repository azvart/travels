import { Module } from '@nestjs/common';
import { FindManyRoutesHandler } from './find-many-routes.handler';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';


@Module({
  imports: [GrpcApiClientsModule],
  providers: [FindManyRoutesHandler],
  exports: [FindManyRoutesHandler]
})
export class FindManyRoutesModule {}
