import { Module } from '@nestjs/common';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';
import { UpdateQuestHandler } from './update-quest.handler';


@Module({
  imports: [GrpcApiClientsModule],
  providers: [UpdateQuestHandler],
  exports: [UpdateQuestHandler]
})
export class UpdateQuestModule {}
