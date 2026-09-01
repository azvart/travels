import { questStatus } from '@app/proto/generated/quest/quest';

export interface IFindManyUserQuests {
  questId?: string;
  status?: questStatus;
  createdAt?: Date;
  completedAt?: Date;
}
