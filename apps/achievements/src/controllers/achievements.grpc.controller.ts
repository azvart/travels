import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AchievementsService } from '../services/achievements.service';

@Controller()
export class AchievementsGrpcController {
  public constructor(
    private readonly achievementsService: AchievementsService,
  ) {}

  @GrpcMethod('Achievements', 'getAchievements')
  public async getAllAchievements() {
    return this.achievementsService.getAllAchievements();
  }

  @GrpcMethod('Achievements', 'getAchievement')
  public async getAchievementById(data: { id: string }) {
    return this.achievementsService.getAchievementById(data.id);
  }

  @GrpcMethod('Achievements', 'createAchievement')
  public async createAchievement(data: { name: string; points: number }) {
    return this.achievementsService.createAchievement(data.name, data.points);
  }

  @GrpcMethod('Achievements', 'deleteAchievement')
  public async deleteAchievement(data: { id: string }) {
    return this.achievementsService.deleteAchievement(data.id);
  }

  @GrpcMethod('Achievements', 'attachedAchievementToUser')
  public async attachAchievementToUser(data: {
    userId: string;
    achievementId: string;
  }) {
    return this.achievementsService.attachAchievementToUser(
      data.userId,
      data.achievementId,
    );
  }
}
