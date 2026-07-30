import { Module } from '@nestjs/common';

import { RedisModule } from '@app/redis';
import { AppConfigModule } from '@app/app-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountPresentationModule } from './presentation/account.presentation.module';
import { AccountEntity, QuestEntity, UserEntity, UserQuestEntity } from '@app/entities/enity';

@Module({
  imports: [
    AppConfigModule.forRootAsync(),
    RedisModule,
    AccountPresentationModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 54321,
      username: 'root',
      database: 'travels',
      password: 'root_password',
      autoLoadEntities: true,
      synchronize: true,
      entities: [AccountEntity, UserEntity, UserQuestEntity, QuestEntity]
    }),
  ],
})
export class AppModule {}
