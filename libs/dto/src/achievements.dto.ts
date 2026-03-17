import { AchievementsEntity } from '@app/entities/enity';

export class Achievements {
  public static fromEntity(achievementsEntity?: AchievementsEntity | null) {
    return achievementsEntity
      ? new Achievements(
          achievementsEntity.id,
          achievementsEntity.name,
          achievementsEntity.points,
        )
      : null;
  }

  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _points: number,
  ) {}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get points() {
    return this._points;
  }
}
