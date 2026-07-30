import { Module } from '@nestjs/common';
import { AccountGrpcService } from '@app/grpc-api-clients/account';

import { AppConfigModule } from '@app/app-config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ACCOUNT_PACKAGE_NAME } from '@app/proto';
import { ROUTE_PACKAGE_NAME } from '@app/proto/generated/route/route';
import { join } from 'node:path';
import { RouteGrpcService } from '@app/grpc-api-clients/route';
import { QUEST_PACKAGE_NAME } from '@app/proto/generated/quest/quest';
import { QuestGrpcService } from '@app/grpc-api-clients/quest';

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
      {
        imports: [AppConfigModule.forRootAsync()],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.GRPC,
            options: {
              package: ROUTE_PACKAGE_NAME,
              protoPath: join(process.cwd(), 'libs/proto/src/route', 'route.proto'),
              url: `${configService.get<string>('ROUTE_GRPC_HOST')}:${configService.get('ROUTE_GRPC_PORT')}`,
            },
          };
        },
        name: 'ROUTE_GRPC_SERVICE',
      },
      {
        imports: [AppConfigModule.forRootAsync()],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.GRPC,
            options: {
              package: QUEST_PACKAGE_NAME,
              protoPath: join(process.cwd(), 'libs/proto/src/quest', 'quest.proto'),
              url: `${configService.get<string>('QUEST_GRPC_HOST')}:${configService.get('QUEST_GRPC_PORT')}`,
            }
          };
        },
        name: 'QUEST_GRPC_SERVICE'
      },
    ]),
  ],
  providers: [AccountGrpcService, RouteGrpcService, QuestGrpcService],
  exports: [AccountGrpcService, RouteGrpcService, QuestGrpcService],
})
export class GrpcApiClientsModule {}
