import { QUEST_TYPE } from './quest.type.enum';


export interface IFindManyQuests {
  questType?: QUEST_TYPE,
  questCountry?: string;
}
