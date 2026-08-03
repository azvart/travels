import { Injectable } from '@nestjs/common';
import { CreateQuestHandler } from '../use-case/create-quest/create-quest.handler';
import {
  ICreateQuest,
  IDeleteQuest,
  IFindManyQuests,
  IFindManyUserQuests,
  IGetUser,
  IUpdateQuest,
} from 'libs/interfaces';
import { UpdateQuestHandler } from '../use-case/update-quest/update-quest.handler';
import { FindOneQuestHandler } from '../use-case/find-one-quest/find-one-quest.handler';
import { FindManyQuestsHandler } from '../use-case/find-many-quests/find-many-quests.handler';
import { DeleteManyQuestsHandler } from '../use-case/delete-many-quests/delete-many-quests.handler';
import { DeleteOneQuestHandler } from '../use-case/delete-one-quest/delete-one-quest.handler';
import { AttachQuestToUserHandler } from '../use-case/attach-quest-to-user/attach-quest-to-user.handler';
import { FindManyAttachedQuestToUserHandler } from '../use-case/find-many-attached-quest-to-user/find-many-attached-quest-to-user.handler';
import { FindOneUserQuestHandler } from '../use-case/find-one-user-quest/find-one-user-quest.handler';
import { FindManyUserQuestsHandler } from '../use-case/find-many-user-quests/find-many-user-quests.handler';

@Injectable()
export class QuestsPresentationService {
  public constructor(
    private readonly createQuestHandler: CreateQuestHandler,
    private readonly updateQuestHandler: UpdateQuestHandler,
    private readonly findOneQuestHandler: FindOneQuestHandler,
    private readonly findManyQuestsHandler: FindManyQuestsHandler,
    private readonly deleteManyQuestsHandler: DeleteManyQuestsHandler,
    private readonly deleteOneQuestHandler: DeleteOneQuestHandler,
    private readonly attachQuestToUserHandler: AttachQuestToUserHandler,
    private readonly findManyAttachedQuestToUserHandler: FindManyAttachedQuestToUserHandler,
    private readonly findOneUserQuestHandler: FindOneUserQuestHandler,
    private readonly findManyUserQuestHandler: FindManyUserQuestsHandler,
  ) {}

  public async createQuest(data: ICreateQuest) {
    return this.createQuestHandler.run(data);
  }

  public async updateQuest(data: IUpdateQuest) {
    return this.updateQuestHandler.run(data);
  }

  public async findOneQuest(id: string) {
    return this.findOneQuestHandler.run(id);
  }

  public async findManyQuests(data: IFindManyQuests) {
    return this.findManyQuestsHandler.run(data);
  }

  public async deleteOneQuest(data: IDeleteQuest) {
    return this.deleteOneQuestHandler.run(data);
  }

  public async deleteManyQuests(id: string[]) {
    return this.deleteManyQuestsHandler.run(id);
  }

  public async attachQuestToUser(data: { questId: string }, user: IGetUser) {
    const dataObj = {
      questId: data.questId,
      userId: user.userId,
    };
    return this.attachQuestToUserHandler.run(dataObj);
  }

  public async attachedQuests(questId: string, userId: string) {
    return this.findManyAttachedQuestToUserHandler.run(questId, userId);
  }

  public async findOneUserQuest(userId: string, questId: string) {
    return this.findOneUserQuestHandler.run(userId, questId);
  }

  public async findManyUserQuests(userId: string, data: IFindManyUserQuests) {
    return this.findManyUserQuestHandler.run(userId, data);
  }
}
