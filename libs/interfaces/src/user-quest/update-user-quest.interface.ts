import { QuestStatusEnum } from './quest-status.enum';
import { questStatus } from '@app/proto/generated/quest/quest';

export interface IUpdateUserQuest {
  status?: questStatus;
  progress?: number;
  finishResult?: number;
  completedAt?: Date;
}
