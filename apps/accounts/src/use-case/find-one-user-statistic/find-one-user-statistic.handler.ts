import { Injectable } from '@nestjs/common';
import { UserStatisticAbstractRepository } from '../../infrastructure/user-statistic';


@Injectable()
export class FindOneUserStatisticHandler {
  public constructor(
    private readonly userStatisticRepository: UserStatisticAbstractRepository
  ){}

  public async run(userId:string){
    return this.userStatisticRepository.findOneUserStatistic(userId);
  }
}
