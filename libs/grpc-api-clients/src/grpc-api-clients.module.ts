import { Module } from '@nestjs/common';
import { AccountGrpcService } from '@app/grpc-api-clients/account';
import { TravelCardsGrpcService } from '@app/grpc-api-clients/travel-cards';
import { AchievementsGrpcService } from '@app/grpc-api-clients/achievements';
import { AppConfigModule } from '@app/app-config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ACCOUNT_PACKAGE_NAME } from '@app/proto';
import { join } from 'node:path';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [AppConfigModule.forRootAsync()],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          console.log(
            join(process.cwd(), 'libs/proto/src/account', 'account.proto'),
          );
          return {
            transport: Transport.GRPC,
            options: {
              package: ACCOUNT_PACKAGE_NAME,
              protoPath: join(
                process.cwd(),
                'libs/proto/src/account',
                'account.proto',
              ),
              url: `${configService.get<string>('ACCOUNTS_GRPC_HOST')}:${configService.get<string>('ACCOUNTS_GRPC_PORT')}`,
            },
          };
        },
        name: 'ACCOUNT_GRPC_SERVICE',
      },
    ]),
  ],
  providers: [
    AccountGrpcService,
    TravelCardsGrpcService,
    AchievementsGrpcService,
  ],
  exports: [
    AccountGrpcService,
    TravelCardsGrpcService,
    AchievementsGrpcService,
  ],
})
export class GrpcApiClientsModule {}
