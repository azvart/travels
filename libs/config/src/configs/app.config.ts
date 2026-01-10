import { Injectable } from '@nestjs/common';
import { BaseConfig } from './base.config';

@Injectable()
export class AppConfig extends BaseConfig {
  public readonly httpPort =
    this.getNumber(`${this.appName}_APP_SERVICE_PORT`) || 50000;

  public readonly host: string =
    this.getString(`${this.appName}_APP_HOST`) || '0.0.0.0';

  public jwtOptions = {
    signSecret: this.getString('JWT_SIGN_SECRET') || process.env.NODE_ENV,
    verifySecret:
      this.getString('JWT_VERIFY_SECRET') ||
      this.getString('JWT_SIGN_SECRET') ||
      process.env.NODE_ENV,
    signOptions: {
      algorithm: this.getString('JWT_ALG') || 'RS512',
      expiresIn: this.getString('JWT_EXPIRES') || '24h',
    },
    verifyOptions: {
      algorithms: [this.getString('JWT_ALG') || 'RS512'],
    },
  };
}
