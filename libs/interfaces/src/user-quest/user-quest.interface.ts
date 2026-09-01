import {
  questCondition,
  questField,
  questStatus,
  questType,
} from '@app/proto/generated/quest/quest';

export interface IUserQuest {
  id: string;
  userId: string;
  questId: string;
  status: questStatus;
  questCondition: questCondition,
  questField: questField,
  questType: questType,
  progress: number;
  finishResult: number;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
}
