import { Module } from '@nestjs/common';
import { QuestProgressHandler } from './quest-progress.handler';
import { BullModule } from '@nestjs/bullmq';
import { RedisModule } from '@app/redis';
import { GrpcApiClientsModule } from '@app/grpc-api-clients';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDSIT_HOST || 'localhost',
        port: 6379,
      },
      prefix: 'bull',
    }),
    BullModule.registerQueue({
      name: 'jobs',
    }),
    RedisModule,
    GrpcApiClientsModule,
  ],
  providers: [QuestProgressHandler],
  exports: [BullModule, QuestProgressHandler],
})
export class QuestProgressModule {}
