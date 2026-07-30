import { QuestStatusEnum } from './quest-status.enum';

export interface IUpdateUserQuest {
  status?: QuestStatusEnum,
  progress?: number,
  finishResult?: number;
  completedAt?: Date
}
