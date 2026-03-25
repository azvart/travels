import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AppConfigModule } from '@app/app-config';

///TODO Rewrite Database module

@Module({
  imports: [
    AppConfigModule.forRootAsync(),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 54321,
    //   username: 'root',
    //   database: 'travels',
    //   password: 'root_password',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<'mysql' | 'mariadb'>('TYPEORM_TYPE') as
            | 'mysql'
            | 'mariadb',
          host: configService.get<string>('DB_HOST') as string,
          port: configService.get<number>('DB_PORT') as number,
          username: configService.get<string>('DB_USERNAME') as string,
          database: configService.get<string>('DB_DATABASE') as string,
          password: configService.get<string>('DB_PASSWORD') as string,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
