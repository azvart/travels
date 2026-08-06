import { Injectable } from '@nestjs/common';
import { AwardsAbstractRepository } from '../../infrastructure/awards/awards.abstract.repository';

@Injectable()
export class FindManyAwardsHandler {
  public constructor(private readonly awardRepository: AwardsAbstractRepository) {}

  public async run() {
    return this.awardRepository.findManyAwards();
  }
}
