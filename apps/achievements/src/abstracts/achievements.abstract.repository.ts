import { Achievements } from '@app/dto';
import { AchievementsEntity } from '@app/entities/enity';

export abstract class AchievementsAbstractRepository {
  abstract findMany(): Promise<(AchievementsEntity | null)[]>;
  abstract findOneById(id: string): Promise<Achievements | null>;
  abstract create(name: string, points: number): Promise<Achievements | null>;
  abstract deleteById(id: string): Promise<boolean>;
}
