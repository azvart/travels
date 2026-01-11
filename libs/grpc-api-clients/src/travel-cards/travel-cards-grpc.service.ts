import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import {
  TRAVEL_CARD_SERVICE_NAME,
  TRAVEL_CARDS_PACKAGE_NAME,
  TravelCardClient,
} from '@app/proto/generated/travels-card/travels-card';
import { join } from 'node:path';

@Injectable()
export class TravelCardsGrpcService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: TRAVEL_CARDS_PACKAGE_NAME,
      protoPath: join(
        process.cwd(),
        'libs/proto/src/travels-card',
        'travels-card.proto',
      ),
      url: `0.0.0.0:${process.env.TRAVEL_CARDS_GRPC_PORT || '50053'}`,
    },
  })
  private readonly client: ClientGrpc;

  public service: TravelCardClient;

  onModuleInit() {
    this.service = this.client.getService<TravelCardClient>(
      TRAVEL_CARD_SERVICE_NAME,
    );
    console.log('TravelCardsGrpcService init');
  }
}
