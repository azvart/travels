import { QUEST_TYPE } from 'libs/interfaces';


export interface ICreateQuest {
  questName: string;
  questDescription: string;
  questReward: string;
  questCondition: string;
  questType?: QUEST_TYPE;
  questCountry: string;
}
