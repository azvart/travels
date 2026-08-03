import {
  IDeleteUserQuest,
  IFindManyUserQuests,
  IUpdateUserQuest,
  IUserQuest,
} from 'libs/interfaces';

export abstract class UserQuestAbstractRepository {
  abstract attachQuestToUser(
    userId: string,
    questId: string | string[],
  ): Promise<IUserQuest | IUserQuest[]>;
  abstract completeQuest(
    userId: string,
    questId: string | string[],
  ): Promise<IUserQuest | IUserQuest[]>;
  abstract deleteQuests(questId: string | string[]): Promise<IDeleteUserQuest>;
  abstract updateQuests(userQuestId: string, data: IUpdateUserQuest): Promise<IUserQuest>;
  abstract findManyUserQuests(userId: string, data: IFindManyUserQuests): Promise<IUserQuest[]>;
  abstract findOneUserQuest(userId: string, questId: string): Promise<IUserQuest>;
  abstract findAllUserQuests(userId?: string): Promise<IUserQuest[]>;
}
