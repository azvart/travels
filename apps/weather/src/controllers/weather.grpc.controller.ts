import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class WeatherGrpcController {
  public constructor() {}

  @GrpcMethod()
  public async weather() {}
}
