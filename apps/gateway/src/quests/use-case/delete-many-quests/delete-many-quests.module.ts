import { Module } from '@nestjs/common';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { DeleteManyQuestsHandler } from './delete-many-quests.handler';

@Module({
  imports: [GrpcApiClientsModule],
  providers: [DeleteManyQuestsHandler],
  exports: [DeleteManyQuestsHandler],
})
export class DeleteManyQuestsModule {}
