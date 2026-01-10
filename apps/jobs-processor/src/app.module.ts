import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from '@app/redis';
import { RedisBullModule } from './modules/redisBull/redisBull.module';
import { DomainsModule } from './modules/domains/domains.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    RedisModule,
    RedisBullModule,
    DomainsModule,
    SchedulerModule,
  ],
})
export class AppModule {}
