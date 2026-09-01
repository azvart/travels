import { Module } from '@nestjs/common';

import { RedisModule } from '@app/redis';
import { AppConfigModule } from '@app/app-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountPresentationModule } from './presentation/account.presentation.module';
import {
  AccountEntity,
  QuestEntity,
  UserEntity,
  UserQuestEntity,
  UserGamificationEntity,
  UserTelemetryEntity,
  UserStatisticEntity,
} from '@app/entities/enity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AppConfigModule.forRootAsync(),
    RedisModule,
    AccountPresentationModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<'mysql' | 'mariadb'>('TYPEORM_TYPE'),
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          database: configService.get<string>('DB_DATABASE'),
          password: configService.get<string>('DB_PASSWORD'),
          autoLoadEntities: true,
          synchronize: true,
          entities: [
            AccountEntity,
            UserEntity,
            UserQuestEntity,
            QuestEntity,
            UserGamificationEntity,
            UserTelemetryEntity,
            UserStatisticEntity,
          ],
        };
      },
    }),
  ],
})
export class AppModule {}
