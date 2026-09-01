import { questType, questCondition, questField } from '@app/proto/generated/quest/quest';

export interface ICreateQuest {
  questName: string;
  questDescription: string;
  questReward: string;
  questCondition: questCondition;
  questFinishResults: number;
  questField: questField;
  questType: questType;
  questCountry: string;
}
