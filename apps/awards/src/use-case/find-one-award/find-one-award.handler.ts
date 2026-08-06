import { Injectable } from '@nestjs/common';
import { AwardsAbstractRepository } from '../../infrastructure/awards/awards.abstract.repository';

@Injectable()
export class FindOneAwardHandler {
  public constructor(private readonly awardRepository: AwardsAbstractRepository) {}

  public async run(id: string) {
    return this.awardRepository.findOneAward(id);
  }
}
