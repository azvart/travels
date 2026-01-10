import { resolve } from 'node:path';
import { Injectable } from '@nestjs/common';

import * as process from 'node:process';

@Injectable()
export abstract class BaseConfig {
  protected readonly env = this.getEnv();
  public readonly appName: string | undefined = BaseConfig.getAppName();
  public readonly nodeEnv: string | undefined = this.getString('NODE_ENV');

  protected readonly projectDir = resolve(__dirname, '..', '..', '..');

  public constructor() {
    this.env = this.getEnv();
  }

  public static getAppName(): string | undefined {
    return process.env['APP_NAME'];
  }

  public getString(envVarName: string): string | undefined {
    return this.env[envVarName];
  }

  public getNumber(envVarName: string): number | undefined {
    const value = this.env[envVarName];
    if (value === undefined) {
      return undefined;
    }
    return Number(value);
  }

  public getBoolean(envVarName: string): boolean | undefined {
    switch (this.env[envVarName]) {
      case 'true':
        return true;
      case 'false':
        return false;
      case undefined:
        return undefined;
      default:
        throw new Error(`Env var ${envVarName} is not boolean string`);
    }
  }

  protected getEnv(): Record<string, string | undefined> {
    return process.env;
  }
}
