import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/app-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwardsPresentationModule } from './presentation/awards.presentation.module';

@Module({
  imports: [
    AppConfigModule.forRootAsync(),
    AwardsPresentationModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 54321,
      username: 'root',
      database: 'travels',
      password: 'root_password',
      autoLoadEntities: true,
      synchronize: true,
      entities: [],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
