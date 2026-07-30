import { Module } from '@nestjs/common';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { FindManyQuestsHandler } from './find-many-quests.handler';


@Module({
  imports: [GrpcApiClientsModule],
  providers: [FindManyQuestsHandler],
  exports: [FindManyQuestsHandler]
})
export class FindManyQuestsModule {}
