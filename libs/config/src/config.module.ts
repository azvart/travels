import { Module } from '@nestjs/common';
import { AppConfig } from './configs/app.config';
import { DatabaseConfig } from 'libs/config/configs';

const configs = [AppConfig, DatabaseConfig];

@Module({
  providers: configs,
  exports: configs,
})
export class ConfigModule {}
