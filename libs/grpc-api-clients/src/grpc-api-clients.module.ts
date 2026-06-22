import { Module } from '@nestjs/common';
import { AccountGrpcService } from '@app/grpc-api-clients/account';
import { AchievementsGrpcService } from '@app/grpc-api-clients/achievements';
import { WeatherGrpcService } from '@app/grpc-api-clients/weather';
import { AppConfigModule } from '@app/app-config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ACCOUNT_PACKAGE_NAME } from '@app/proto';
import { join } from 'node:path';
import { WEATHER_PACKAGE_NAME } from '@app/proto/generated/weather/weather';
import { ROUTE_PACKAGE_NAME } from '@app/proto/generated/route/route';
import { RouteGrpcService } from '@app/grpc-api-clients/route';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [AppConfigModule.forRootAsync()],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.GRPC,
            options: {
              package: ACCOUNT_PACKAGE_NAME,
              protoPath: join(process.cwd(), 'libs/proto/src/account', 'account.proto'),
              url: `${configService.get<string>('ACCOUNTS_GRPC_HOST')}:${configService.get<string>('ACCOUNTS_GRPC_PORT')}`,
            },
          };
        },
        name: 'ACCOUNT_GRPC_SERVICE',
      },
      // {
      //   imports: [AppConfigModule.forRootAsync()],
      //   inject: [ConfigService],
      //   useFactory: (configService: ConfigService) => {
      //     return {
      //       transport: Transport.GRPC,
      //       options: {
      //         package: WEATHER_PACKAGE_NAME,
      //         protoPath: join(process.cwd(), 'libs/proto/src/weather', 'weather.proto'),
      //         url: `${configService.get<string>('WEATHER_GRPC_HOST')}:${configService.get('WEATHER_GRPC_PORT')}`,
      //       },
      //     };
      //   },
      //   name: 'WEATHER_GRPC_SERVICE',
      // },
      // {
      //   imports: [AppConfigModule.forRootAsync()],
      //   inject: [ConfigService],
      //   useFactory: (configService: ConfigService) => {
      //     return {
      //       transport: Transport.GRPC,
      //       options: {
      //         package: ROUTE_PACKAGE_NAME,
      //         protoPath: join(process.cwd(), 'libs/proto/src/route', 'route.proto'),
      //         url: `${configService.get<string>('ROUTE_GRPC_HOST')}:${configService.get('ROUTE_GRPC_PORT')}`,
      //       },
      //     };
      //   },
      //   name: 'ROUTE_GRPC_SERVICE',
      // },
    ]),
  ],
  providers: [
    AccountGrpcService,
    AchievementsGrpcService,
    // WeatherGrpcService,
    // RouteGrpcService,
  ],
  exports: [
    AccountGrpcService,
    AchievementsGrpcService,
    // WeatherGrpcService,
    // RouteGrpcService,
  ],
})
export class GrpcApiClientsModule {}
