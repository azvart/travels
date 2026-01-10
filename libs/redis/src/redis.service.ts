import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import { REDIS_CLIENT } from '@app/redis/redis.provider';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redisClient: Redis,
  ) {}

  async get<T = string>(key: string): Promise<T | null> {
    const value = await this.redisClient.get(key);
    if (!value) return null;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(value);
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const data = JSON.stringify(value);

    if (ttl) {
      await this.redisClient.set(key, data, 'EX', ttl);
    } else {
      await this.redisClient.set(key, data);
    }
  }

  async onModuleDestroy() {
    await this.redisClient.quit();
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.redisClient.exists(key)) === 1;
  }

  getClient(): Redis {
    return this.redisClient;
  }
}
