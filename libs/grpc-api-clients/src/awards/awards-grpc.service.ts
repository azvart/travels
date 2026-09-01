import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AWARDS_SERVICE_NAME, AwardsClient } from '@app/proto/generated/awards/awards';

@Injectable()
export class AwardsGrpcService implements OnModuleInit {
  public constructor(
    @Inject('AWARDS_GRPC_SERVICE')
    private readonly client: ClientGrpc,
  ) {}

  public service!: AwardsClient;

  onModuleInit() {
    this.service = this.client.getService<AwardsClient>(AWARDS_SERVICE_NAME);
    console.log(
      `AwardsGrpcService init and running on ${process.env.AWARDS_GRPC_HOST}:${process.env.AWARDS_GRPC_PORT}`,
    );
  }
}
