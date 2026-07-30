import { QuestStatusEnum } from './quest-status.enum';


export interface IUserQuest {
  id: string;
  userId: string;
  questId: string;
  status: QuestStatusEnum;
  progress: number;
  finishResult: number;
  completedAt: Date | null;
  createdAt: Date;
}
