import { ICreateQuest, IDeleteQuest, IFindManyQuests, IQuest, IUpdateQuest } from 'libs/interfaces';

export abstract class QuestAbstractRepository {
  abstract create(data: ICreateQuest): Promise<IQuest>;
  abstract findMany(data: IFindManyQuests): Promise<IQuest[]>;
  abstract findOne(questId: string): Promise<IQuest>;
  abstract updateOne(questId: string, data: Omit<IUpdateQuest, 'id'>): Promise<IQuest>;
  abstract deleteOne(questId: string): Promise<IDeleteQuest>;
  abstract deleteMany(questsIds: string[]): Promise<IDeleteQuest[]>;
}
