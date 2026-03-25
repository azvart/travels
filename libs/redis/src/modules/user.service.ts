import { RedisService } from '@app/redis/redis.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRedisService {
  constructor(private readonly redis: RedisService) {}

  async setUser(id: string, value: any): Promise<void> {
    await this.redis.getClient().hset('users', id, JSON.stringify(value));
  }

  async getUser<T = any>(id: string): Promise<T | null | undefined> {
    const value = await this.redis.getClient().hget('users', id);
    if (!value) return;

    return JSON.parse(value) as T;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.redis.getClient().hdel('users', id);
    return result === 1;
  }
}
