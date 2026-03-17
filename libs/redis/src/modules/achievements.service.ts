import { Injectable } from '@nestjs/common';
import { RedisService } from '@app/redis/redis.service';

@Injectable()
export class AchievementRedisService {
  public constructor(private readonly redis: RedisService) {}

  async setUserAchievement<T = any>(userId: string, value: T): Promise<void> {
    await this.redis
      .getClient()
      .hset('achievements', userId, JSON.stringify(value));
  }

  async setAchievement<T>(id: string, value: T): Promise<void> {
    await this.redis
      .getClient()
      .hset('achievements', id, JSON.stringify(value));
  }

  async getAchievements<T = any>(
    userId: string,
  ): Promise<T | null | undefined> {
    const value = await this.redis.getClient().hget('achievements', userId);
    if (!value) return;
    return JSON.parse(value) as T;
  }

  async deleteAchievement(achievementId: string): Promise<boolean> {
    const result = await this.redis
      .getClient()
      .hdel('achievements', achievementId);
    return result === 1;
  }
}
