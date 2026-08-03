import { IQuest } from './quest.interface';

export interface IUpdateQuest extends Partial<Omit<IQuest, 'id'>> {
  id: string;
}
