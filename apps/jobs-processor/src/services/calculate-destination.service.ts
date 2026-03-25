import { Injectable, Logger } from '@nestjs/common';
import { TravelCardsGrpcService } from '@app/grpc-api-clients';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CalculateDestinationService {
  private readonly logger = new Logger(CalculateDestinationService.name);

  constructor(
    private readonly travelCardsGrpcService: TravelCardsGrpcService,
  ) {}

  public calculateDestinationFromCard(payload: { cardId: string }) {
    this.logger.log('calculateDestinationFromCard start');
    // return firstValueFrom();
  }
}
