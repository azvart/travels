import { Injectable } from '@nestjs/common';
import { AwardsGrpcService } from '@app/grpc-api-clients/awards';
import { firstValueFrom } from 'rxjs';
import { ICreateAward } from 'libs/interfaces/awards';

@Injectable()
export class CreateAwardHandler {
  public constructor(private readonly awardGrpcService: AwardsGrpcService) {}

  public async run(data: ICreateAward) {
    return firstValueFrom(this.awardGrpcService.service.createAward(data));
  }
}
