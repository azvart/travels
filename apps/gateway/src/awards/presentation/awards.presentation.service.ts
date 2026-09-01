import { Injectable } from '@nestjs/common';
import { CreateAwardHandler } from '../use-case/create-award/create-award.handler';
import { ICreateAward } from 'libs/interfaces/awards';

@Injectable()
export class AwardsPresentationService {
  public constructor(private readonly createAwardHandler: CreateAwardHandler) {}

  public async createAward(data: ICreateAward) {
    return this.createAwardHandler.run(data);
  }
}
