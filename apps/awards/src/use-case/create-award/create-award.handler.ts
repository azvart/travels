import { Injectable } from '@nestjs/common';
import { AwardsAbstractRepository } from '../../infrastructure/awards/awards.abstract.repository';
import { ICreateAward } from 'libs/interfaces/awards';

@Injectable()
export class CreateAwardHandler {
  public constructor(private readonly awardRepository: AwardsAbstractRepository) {}

  public async run(data: ICreateAward) {
    return this.awardRepository.createAward(data);
  }
}
