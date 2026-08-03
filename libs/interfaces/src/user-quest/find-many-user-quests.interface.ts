import { QuestStatusEnum } from './quest-status.enum';

export interface IFindManyUserQuests {
  questId?: string;
  status?: QuestStatusEnum;
  createdAt?: Date;
  completedAt?: Date;
}
