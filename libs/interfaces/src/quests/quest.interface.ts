import { questType, questCondition, questField } from '@app/proto/generated/quest/quest';

export interface IQuest {
  id: string;
  questName: string;
  questDescription: string;
  questReward: string;
  questCondition: questCondition;
  questField: questField;
  questFinishResults: number;
  questType: questType;
  questCountry: string;
}
