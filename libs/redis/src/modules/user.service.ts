import { RedisService } from '@app/redis/redis.service';
import { Injectable } from '@nestjs/common';
import { UserAddressDto } from '@app/dto';
import { createHash } from 'node:crypto';

@Injectable()
export class UserRedisService {
  private readonly REFRESH_TTL_SECONDS = 60 * 60 * 24 * 30;

  public hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }

  private userRedisRefreshKey(userId: string) {
    return `refresh:${userId}`;
  }

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
  async getAllUsers(): Promise<UserAddressDto[]> {
    const redisEntity = await this.redis.getClient().hgetall('users');
    const data = Object.values(redisEntity).map((item) => JSON.parse(item));

    return data?.map((item) => UserAddressDto.fromRedisEntity(item));
  }

  public async saveUserRefreshToken(userId: string, refreshToken:string){
    return await this.redis.getClient().set(
      this.userRedisRefreshKey(userId),
      this.hashToken(refreshToken),
      'EX',
      this.REFRESH_TTL_SECONDS
    )
  }

  public async getUserRefreshToken(userId: string){
    return await this.redis.getClient().get(this.userRedisRefreshKey(userId));
  }

  public async deleteUserRefreshToken(userId: string){
    return await this.redis.getClient().del(this.userRedisRefreshKey(userId));
  }
}
