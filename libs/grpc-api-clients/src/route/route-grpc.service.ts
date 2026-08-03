import { Inject, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ROUTE_SERVICE_NAME, RouteClient } from '@app/proto/generated/route/route';

@Injectable()
export class RouteGrpcService implements OnModuleInit {
  public constructor(@Inject('ROUTE_GRPC_SERVICE') private readonly client: ClientGrpc) {}

  public service!: RouteClient;
  public logger: Logger = new Logger();

  onModuleInit() {
    this.service = this.client.getService<RouteClient>(ROUTE_SERVICE_NAME);
    this.logger.log(
      `RouteGrpcService init and running on ${process.env.ROUTE_GRPC_HOST}:${process.env.ROUTE_GRPC_PORT}`,
    );
  }
}
