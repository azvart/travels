import { Injectable } from '@nestjs/common';
import { BaseConfig } from './base.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

///TODO ADD ENV Variable

@Injectable()
export class DatabaseConfig extends BaseConfig {
  public database = this.getString(`${this.appName}_DATABASE`);

  public connections: TypeOrmModuleOptions | Promise<TypeOrmModuleOptions>;

  public constructor() {
    super();
    const poolSize = this.getNumber(`${this.database}_DB_POOL_SIZE`) || 20;
    const maxPoolSize = this.nodeEnv === 'dev' ? 2 : poolSize;
    const dbNameInUpperCase = this.database?.toUpperCase();
    this.connections = {
      type: 'mysql',
      timezone: 'Z',
      connectorPackage: 'mysql2',
      host: this.getString(`${dbNameInUpperCase}_DB_HOST`),
      username: this.getString(`${dbNameInUpperCase}_DB_USER`),
      password: this.getString(`${dbNameInUpperCase}_DB_PASSWORD`),
      port: this.getNumber(`${dbNameInUpperCase}_DB_PORT`),
      database: this.database,
      name: this.appName,
      logging: this.getBoolean(`${dbNameInUpperCase}_DB_LOGGING`),
      autoLoadEntities: this.getBoolean(
        `${dbNameInUpperCase}_AUTO_LOAD_ENTITIES`,
      ),
      synchronize: this.getBoolean(`${dbNameInUpperCase}_AUTO_SYNCHRONIZE`),
      poolSize: maxPoolSize,
    };
  }
}
