import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/app-config';
import { RedisModule } from '@app/redis';
import { UserProcessorPresentationModule } from './presentation';

@Module({
  imports: [AppConfigModule.forRootAsync(), UserProcessorPresentationModule],
})
export class UserProcessorModule {}
