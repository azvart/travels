import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ACCOUNT_SERVICE_NAME, AccountClient } from '@app/proto';

@Injectable()
export class AccountGrpcService implements OnModuleInit {
  public constructor(
    @Inject('ACCOUNT_GRPC_SERVICE') private readonly client: ClientGrpc,
  ) {}

  public service: AccountClient;

  onModuleInit() {
    this.service = this.client.getService<AccountClient>(ACCOUNT_SERVICE_NAME);
    console.log(
      `AccountGrpcService init and running on ${process.env.ACCOUNTS_GRPC_HOST}:${process.env.ACCOUNTS_GRPC_PORT}`,
    );
  }
}
