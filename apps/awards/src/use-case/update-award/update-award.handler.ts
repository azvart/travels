import { Injectable } from '@nestjs/common';
import { AwardsAbstractRepository } from '../../infrastructure/awards/awards.abstract.repository';
import { IUpdateAward } from 'libs/interfaces/awards';

@Injectable()
export class UpdateAwardHandler {
  public constructor(private readonly awardRepository: AwardsAbstractRepository) {}

  public async run(data: IUpdateAward) {
    return this.awardRepository.updateAward(data);
  }
}
