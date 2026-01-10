import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, DatabaseConfig } from 'libs/config';

///TODO Rewrite Database module

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (dbConfig: DatabaseConfig) => {
    //     return dbConfig.connections;
    //   },
    //   inject: [DatabaseConfig],
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 54321,
      username: 'root',
      database: 'travels',
      password: 'root_password',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
