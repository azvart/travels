import { Injectable } from '@nestjs/common';
import { UserStatisticAbstractRepository } from '../../infrastructure/user-statistic';


@Injectable()
export class FindManyUserStatisticHandler {
  public constructor(
    private readonly userStatisticRepository: UserStatisticAbstractRepository
  ){}

  public run(){
    return this.userStatisticRepository.findManyUserStatistic();
  }
}
