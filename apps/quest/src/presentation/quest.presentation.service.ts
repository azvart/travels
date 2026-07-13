import { Injectable } from '@nestjs/common';
import { CreateQuestHandler } from '../use-case/create-quest/create-quest.handler';
import { ICreateQuest, IFindMany, IUpdateQuest } from 'libs/interfaces';
import { UpdateQuestHandler } from '../use-case/update-quest/update-quest.handler';
import { FindManyQuestHandler } from '../use-case/find-many-quest/find-many-quest.handler';
import { FindOneQuestHandler } from '../use-case/find-one-quest/find-one-quest.handler';
import { DeleteOneQuestHandler } from '../use-case/delete-one-quest/delete-one-quest.handler';
import { DeleteManyQuestHandler } from '../use-case/delete-many-quest/delete-many-quest.handler';

@Injectable()
export class QuestPresentationService {

  public constructor(
    private readonly createQuestHandler: CreateQuestHandler,
    private readonly updateQuestHandler: UpdateQuestHandler,
    private readonly findManyQuestHandler: FindManyQuestHandler,
    private readonly findOneQuestHandler: FindOneQuestHandler,
    private readonly deleteOneQuestHandler: DeleteOneQuestHandler,
    private readonly deleteManyQuestHandler: DeleteManyQuestHandler
  ){}


  public async createQuest(data: ICreateQuest){
    return this.createQuestHandler.run(data);
  }

  public async updateQuest(questId: string, data: IUpdateQuest){
    return this.updateQuestHandler.run(questId, data);
  }

  public async findManyQuest(data: IFindMany){
    return this.findManyQuestHandler.run(data);
  }

  public async findOneQuest(questId: string){
    return this.findOneQuestHandler.run(questId);
  }

  public async deleteOneQuest(questId: string){
    return this.deleteOneQuestHandler.run(questId);
  }

  public async deleteManyQuest(questsIds: string[]){
    return this.deleteManyQuestHandler.run(questsIds);
  }
}
