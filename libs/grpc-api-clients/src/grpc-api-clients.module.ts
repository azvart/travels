import { Module } from '@nestjs/common';
import { AccountGrpcService } from '@app/grpc-api-clients/account';
import { TravelCardsGrpcService } from '@app/grpc-api-clients/travel-cards';
import { AchievementsGrpcService } from '@app/grpc-api-clients/achievements';
import { AppConfigModule } from '@app/app-config';

@Module({
  imports: [AppConfigModule.forRootAsync()],
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
