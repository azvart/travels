import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: 6379,
      },
      prefix: 'bull',
    }),
    BullModule.registerQueue({
      name: 'jobs',
    }),
  ],
  exports: [BullModule],
})
export class RedisBullModule {}
