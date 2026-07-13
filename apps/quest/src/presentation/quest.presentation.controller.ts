import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { QuestPresentationService } from './quest.presentation.service';
import { ICreateQuest, IFindMany, IUpdateQuest } from 'libs/interfaces';

@Controller()
export class QuestPresentationController {
  public constructor(
    private readonly questsPresentationService: QuestPresentationService
  ){}



  @GrpcMethod('Quest', 'createQuest')
  public async createQuest(data: ICreateQuest){
    return this.questsPresentationService.createQuest(data);
  }

  @GrpcMethod('Quest', 'updateQuest')
  public async updateQuest(data: IUpdateQuest & { questId: string; }){

    const dataObj:IUpdateQuest = {
      questCondition: data.questCondition,
      questCountry: data.questCountry,
      questDescription: data.questDescription,
      questReward: data.questReward,
      questName: data.questName,
      questType: data.questType
    }

    return this.questsPresentationService.updateQuest(data.questId, dataObj);
  }

  @GrpcMethod('Quest', 'findMany')
  public async findManyQuest(data: IFindMany){
    return this.questsPresentationService.findManyQuest(data);
  }

  @GrpcMethod('Quest', 'findOne')
  public async findOneQuest(data: { questId: string }){
    return this.questsPresentationService.findOneQuest(data.questId);
  }

  @GrpcMethod('Quest', 'deleteOne')
  public async deleteOneQuest(data: {questId: string}){
    return this.questsPresentationService.deleteOneQuest(data.questId);
  }

  @GrpcMethod('Quest', 'deleteMany')
  public async deleteManyQuest(data: { questsIds: string[] }){
    return this.questsPresentationService.deleteManyQuest(data.questsIds);
  }

}
