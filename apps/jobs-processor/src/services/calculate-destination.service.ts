import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CalculateDestinationService {
  private readonly logger = new Logger(CalculateDestinationService.name);

  constructor() {}

  public calculateDestinationFromCard(payload: { cardId: string }) {
    this.logger.log('calculateDestinationFromCard start');
    // return firstValueFrom();
  }
}
