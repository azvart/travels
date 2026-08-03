import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { QuestPresentationService } from './quest.presentation.service';
import {
  ICreateQuest,
  IFindManyQuests,
  IFindManyUserQuests,
  IUpdateQuest,
  IUpdateUserQuest,
} from 'libs/interfaces';

@Controller()
export class QuestPresentationController {
  public constructor(private readonly questsPresentationService: QuestPresentationService) {}

  @GrpcMethod('Quest', 'createQuest')
  public async createQuest(data: ICreateQuest) {
    return this.questsPresentationService.createQuest(data);
  }

  @GrpcMethod('Quest', 'updateQuest')
  public async updateQuest(data: IUpdateQuest) {
    const dataObj: Omit<IUpdateQuest, 'id'> = {
      questCondition: data.questCondition,
      questCountry: data.questCountry,
      questDescription: data.questDescription,
      questReward: data.questReward,
      questName: data.questName,
      questType: data.questType,
    };

    return this.questsPresentationService.updateQuest(data.id, dataObj);
  }

  @GrpcMethod('Quest', 'findMany')
  public async findManyQuest(data: IFindManyQuests) {
    return this.questsPresentationService.findManyQuest(data);
  }

  @GrpcMethod('Quest', 'findOne')
  public async findOneQuest(data: { questId: string }) {
    return this.questsPresentationService.findOneQuest(data.questId);
  }

  @GrpcMethod('Quest', 'deleteOne')
  public async deleteOneQuest(data: { id: string }) {
    return this.questsPresentationService.deleteOneQuest(data.id);
  }

  @GrpcMethod('Quest', 'deleteMany')
  public async deleteManyQuest(data: { id: string[] }) {
    return this.questsPresentationService.deleteManyQuest(data.id);
  }

  @GrpcMethod('Quest', 'attachQuestToUser')
  public async attachQuestToUser(data: { userId: string; questId: string | string[] }) {
    return this.questsPresentationService.attachQuestToUser(data);
  }

  @GrpcMethod('Quest', 'completeQuest')
  public async completeQuest(data: { userId: string; questId: string | string[] }) {
    return this.questsPresentationService.completeQuest(data);
  }

  @GrpcMethod('Quest', 'deleteQuests')
  public async deleteQuests(data: { questId: string | string[] }) {
    return this.questsPresentationService.deleteQuests(data);
  }

  @GrpcMethod('Quest', 'updateQuests')
  public async updateQuests(data: { userQuestId: string; data: IUpdateUserQuest }) {
    return this.questsPresentationService.updateQuests(data);
  }
  @GrpcMethod('Quest', 'findManyUserQuests')
  public async findManyUserQuests(data: { userId: string; data: IFindManyUserQuests }) {
    return this.questsPresentationService.findManyUserQuests(data);
  }

  @GrpcMethod('Quest', 'findOneUserQuest')
  public async findOneUserQuest(data: { userId: string; questId: string }) {
    return this.questsPresentationService.findOneUserQuest(data);
  }

  @GrpcMethod('Quest', 'findAllUserQuests')
  public async findAllUserQuests(data: { userId?: string }) {
    return this.questsPresentationService.findAllUserQuests(data);
  }
}
