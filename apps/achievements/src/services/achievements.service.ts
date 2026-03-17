import { Injectable } from '@nestjs/common';
import { AchievementsAbstractRepository } from '../abstracts/achievements.abstract.repository';

@Injectable()
export class AchievementsService {
  public constructor(
    private readonly achievementRepository: AchievementsAbstractRepository,
  ) {}

  public async getAllAchievements() {
    return this.achievementRepository.findMany();
  }

  public async getAchievementById(id: string) {
    return this.achievementRepository.findOneById(id);
  }

  public async createAchievement(name: string, points: number) {
    return this.achievementRepository.create(name, points);
  }

  public async deleteAchievement(id: string) {
    return this.achievementRepository.deleteById(id);
  }
}
