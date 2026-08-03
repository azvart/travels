import { RedisService } from '../redis.service';
import { Injectable } from '@nestjs/common';
import { IUserQuest } from 'libs/interfaces';

@Injectable()
export class UserQuestService {
  public constructor(private readonly redis: RedisService) {}

  private userQuestKey(userId: string) {
    return `quests:${userId}`;
  }

  public async startQuests(userId: string, questId: string, userQuestEntity: IUserQuest) {
    return this.redis
      .getClient()
      .hset(this.userQuestKey(userId), questId, JSON.stringify(userQuestEntity));
  }

  public async updateQuest(userId: string, questId: string, data: IUserQuest) {
    return this.redis.getClient().hset(this.userQuestKey(userId), questId, JSON.stringify(data));
  }

  public deserialize(raw: any): IUserQuest {
    return {
      ...raw,
      completedAt: raw.completedAt ? new Date(raw.completedAt) : null,
      createdAt: new Date(raw.createdAt),
    };
  }

  public async deleteQuest(userId: string, questId: string) {
    return this.redis.getClient().hdel(this.userQuestKey(userId), questId);
  }

  public async getAllQuests(userId: string) {
    return this.redis.getClient().hgetall(this.userQuestKey(userId));
  }
}
