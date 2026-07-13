import { ICreateQuest, IFindMany, IQuest, IUpdateQuest } from 'libs/interfaces';

export abstract class QuestAbstractRepository {
  abstract create(data: ICreateQuest):Promise<IQuest>;
  abstract findMany(data: IFindMany):Promise<IQuest[]>;
  abstract findOne(questId: string):Promise<IQuest | null>;
  abstract updateOne(questId: string, data: IUpdateQuest):Promise<IQuest>;
  abstract deleteOne(questId: string):Promise<string>;
  abstract deleteMany(questsIds: string[]):Promise<string[]>;
}
