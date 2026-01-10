import { Injectable } from '@nestjs/common';
import { RedisService } from '@app/redis/redis.service';

@Injectable()
export class AccountsRedisService {
  constructor(private readonly redis: RedisService) {}

  async setAccount<T = any>(id: string, value: T): Promise<void> {
    await this.redis.getClient().hset('accounts', id, JSON.stringify(value));
  }

  async getAccount<T = any>(id: string): Promise<T | null | undefined> {
    const value = await this.redis.getClient().hget('accounts', id);
    if (!value) return;
    return JSON.parse(value) as T;
  }

  async getAllAccounts<T = any>(): Promise<T[]> {
    const data = await this.redis.getClient().hgetall('accounts');

    return Object.values(data).map((account) => JSON.parse(account) as T);
  }

  async deleteAccount(id: string): Promise<boolean> {
    const result = await this.redis.getClient().hdel('accounts', id);
    return result === 1;
  }

  async deleteAllAccounts(): Promise<void> {
    await this.redis.getClient().hdel('accounts');
  }
}
