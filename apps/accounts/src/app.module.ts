import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database';

import { AccountModule } from './modules/account.module';
import { RedisModule } from '@app/redis';

@Module({
  imports: [DatabaseModule, AccountModule, RedisModule],
})
export class AppModule {}
