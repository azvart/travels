import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from '@app/redis';
import { RedisBullModule } from './modules/redisBull.module';
import { SchedulerModule } from './modules/scheduler.module';
import { AppConfigModule } from '@app/app-config';

@Module({
  imports: [
    AppConfigModule.forRootAsync(),
    ScheduleModule.forRoot(),
    RedisModule,
    RedisBullModule,
    SchedulerModule,
  ],
})
export class AppModule {}
