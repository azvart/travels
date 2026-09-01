import { Injectable } from '@nestjs/common';
import { UserStatisticAbstractRepository } from '../../infrastructure/user-statistic';
import { IUpdateUserStatistic } from 'libs/interfaces/user-statistic';


@Injectable()
export class UpdateUserStatisticHandler {
  public constructor(
    private readonly userStatisticRepository: UserStatisticAbstractRepository
  ){}

  public async run(userId: string, data: IUpdateUserStatistic){
    return this.userStatisticRepository.updateUserStatistic(userId, data);
  }
}
