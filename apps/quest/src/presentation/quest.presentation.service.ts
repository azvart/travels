import { Injectable } from '@nestjs/common';
import { CreateQuestHandler } from '../use-case/create-quest/create-quest.handler';
import { ICreateQuest, IFindManyQuests, IFindManyUserQuests, IUpdateQuest, IUpdateUserQuest } from 'libs/interfaces';
import { UpdateQuestHandler } from '../use-case/update-quest/update-quest.handler';
import { FindManyQuestHandler } from '../use-case/find-many-quest/find-many-quest.handler';
import { FindOneQuestHandler } from '../use-case/find-one-quest/find-one-quest.handler';
import { DeleteOneQuestHandler } from '../use-case/delete-one-quest/delete-one-quest.handler';
import { DeleteManyQuestHandler } from '../use-case/delete-many-quest/delete-many-quest.handler';
import { AttachQuestToUserHandler } from '../use-case/attach-quest-to-user/attach-quest-to-user.handler';
import { CompleteQuestsHandler } from '../use-case/complete-quests/complete-quests.handler';
import { DeleteQuestsHandler } from '../use-case/delete-quests/delete-quests.handler';
import { UpdateUserQuestsHandler } from '../use-case/update-user-quests/update-user-quests.handler';
import { FindManyUserQuestsHandler } from '../use-case/find-many-user-quests/find-many-user-quests.handler';
import { FindOneUserQuestHandler } from '../use-case/find-one-user-quest/find-one-user-quest.handler';
import { FindAllUserQuestsHandler } from '../use-case/find-all-user-quests/find-all-user-quests.handler';

@Injectable()
export class QuestPresentationService {
  public constructor(
    private readonly createQuestHandler: CreateQuestHandler,
    private readonly updateQuestHandler: UpdateQuestHandler,
    private readonly findManyQuestHandler: FindManyQuestHandler,
    private readonly findOneQuestHandler: FindOneQuestHandler,
    private readonly deleteOneQuestHandler: DeleteOneQuestHandler,
    private readonly deleteManyQuestHandler: DeleteManyQuestHandler,
    private readonly attachQuestToUserHandler: AttachQuestToUserHandler,
    private readonly completeQuestHandler: CompleteQuestsHandler,
    private readonly deleteQuestsHandler: DeleteQuestsHandler,
    private readonly updateUserQuestsHandler:UpdateUserQuestsHandler,
    private readonly findManyUserQuestsHandler:FindManyUserQuestsHandler,
    private readonly findOneUserQuestHandler: FindOneUserQuestHandler,
    private readonly findAllUserQuestsHandler: FindAllUserQuestsHandler
  ) {}

  public async createQuest(data: ICreateQuest) {
    return this.createQuestHandler.run(data);
  }

  public async updateQuest(questId: string, data: Omit<IUpdateQuest, 'id'>) {
    return this.updateQuestHandler.run(questId, data);
  }

  public async findManyQuest(data: IFindManyQuests) {
    return this.findManyQuestHandler.run(data);
  }

  public async findOneQuest(questId: string) {
    return this.findOneQuestHandler.run(questId);
  }

  public async deleteOneQuest(questId: string) {
    return this.deleteOneQuestHandler.run(questId);
  }

  public async deleteManyQuest(questsIds: string[]) {
    return this.deleteManyQuestHandler.run(questsIds);
  }

  public async attachQuestToUser(data: { userId: string; questId: string | string[] }) {
    return this.attachQuestToUserHandler.run(data);
  }

  public async completeQuest(data: { userId: string; questId: string | string[] }) {
    return this.completeQuestHandler.run(data);
  }

  public async deleteQuests(data: { questId: string | string[] }) {
    return this.deleteQuestsHandler.run(data.questId);
  }

  public async updateQuests(data: { userQuestId: string; data: IUpdateUserQuest }) {
    return this.updateUserQuestsHandler.run(data.userQuestId, data.data);
  }

  public async findManyUserQuests(data: { userId: string; data: IFindManyUserQuests }) {
    return this.findManyUserQuestsHandler.run(data.userId, data.data);
  }

  public async findOneUserQuest(data: { userId: string, questId: string }) {
    return this.findOneUserQuestHandler.run(data.userId, data.questId);
  }

  public async findAllUserQuests(data: {userId?:string}){
    return this.findAllUserQuestsHandler.run(data.userId);
  }
}
