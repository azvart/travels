import { questType } from '@app/proto/generated/quest/quest';

export interface IFindManyQuests {
  questType?: questType;
  questCountry?: string;
}
