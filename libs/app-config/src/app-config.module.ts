import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

@Global()
@Module({})
export class AppConfigModule {
  public static forRootAsync(): DynamicModule {
    const envFilePath = path.resolve(process.cwd(), '.env');
    return {
      module: AppConfigModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath,
        }),
      ],
    };
  }
}
