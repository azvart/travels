import { Module } from '@nestjs/common';

import { AccountModule } from './modules/account.module';
import { RedisModule } from '@app/redis';
import { AppConfigModule } from '@app/app-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountOrmEntity, UserAddressOrmEntity, UserOrmEntity } from '@app/entities/enity';

@Module({
  imports: [
    AppConfigModule.forRootAsync(),
    AccountModule,
    RedisModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 54321,
      username: 'root',
      database: 'travels',
      password: 'root_password',
      autoLoadEntities: true,
      synchronize: true,
      entities: [AccountOrmEntity, UserOrmEntity, UserAddressOrmEntity]
    }),
  ],
})
export class AppModule {}
