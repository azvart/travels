import { Module } from '@nestjs/common';
import { AccountGrpcService } from '@app/grpc-api-clients/account';
import { TravelCardsGrpcService } from '@app/grpc-api-clients/travel-cards';

@Module({
  providers: [AccountGrpcService, TravelCardsGrpcService],
  exports: [AccountGrpcService, TravelCardsGrpcService],
})
export class GrpcApiClientsModule {}
