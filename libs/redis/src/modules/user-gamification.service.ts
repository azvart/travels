import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis.service';
import { IUserGamification } from 'libs/interfaces';

@Injectable()
export class UserGamificationService {
  public constructor(private readonly redis: RedisService) {}

  private userGamificationKey(userId: string) {
    return `user-gamification-${userId}`;
  }

  public async createUserGamification(
    userId: string,
    userGamificationId: string,
    data: IUserGamification,
  ) {
    return this.redis
      .getClient()
      .hset(this.userGamificationKey(userId), userGamificationId, JSON.stringify(data));
  }

  public async updateUserGamification(
    userId: string,
    userGamificationId: string,
    data: IUserGamification,
  ) {
    return this.redis
      .getClient()
      .hset(this.userGamificationKey(userId), userGamificationId, JSON.stringify(data));
  }

  public async getUserGamification(userId: string, userGamificationId: string) {
    return this.redis.getClient().hget(this.userGamificationKey(userId), userGamificationId);
  }
}
