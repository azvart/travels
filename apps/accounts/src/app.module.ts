import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database';

import { AccountModule } from './modules/account.module';
import { RedisModule } from '@app/redis';
import { AppConfigModule } from '@app/app-config';

@Module({
  imports: [
    AppConfigModule.forRootAsync(),
    DatabaseModule,
    AccountModule,
    RedisModule,
  ],
})
export class AppModule {}
