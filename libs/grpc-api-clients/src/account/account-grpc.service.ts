import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import {
  ACCOUNT_PACKAGE_NAME,
  ACCOUNT_SERVICE_NAME,
  AccountClient,
} from '@app/proto';
import { join } from 'node:path';

@Injectable()
export class AccountGrpcService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: ACCOUNT_PACKAGE_NAME,
      protoPath: join(process.cwd(), 'libs/proto/src/account', 'account.proto'),
      url: `0.0.0.0:${process.env.ACCOUNT_GRPC_PORT || '50052'}`,
    },
  })
  private readonly client: ClientGrpc;

  public service: AccountClient;

  onModuleInit() {
    this.service = this.client.getService<AccountClient>(ACCOUNT_SERVICE_NAME);
    console.log(`AccountGrpcService init`);
  }
}
