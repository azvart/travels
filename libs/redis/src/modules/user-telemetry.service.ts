import { RedisService } from '../redis.service';
import { Injectable } from '@nestjs/common';
import { IUpdateUserTelemetry, IUserTelemetry } from 'libs/interfaces';

@Injectable()
export class UserTelemetryService {
  public constructor(private readonly redis: RedisService) {}

  private userTelemetry() {
    return `user-telemetry`;
  }

  private userRouteTelemetryKey(userId: string) {
    return `user-telemetry:${userId}`;
  }

  public async createUserRouteTelemetry(userId: string, routeId: string, data: any) {
    return this.redis
      .getClient()
      .hset(this.userRouteTelemetryKey(userId), routeId, JSON.stringify(data));
  }

  public async updateUserRouteTelemetry(
    userId: string,
    routeId: string,
    data: IUpdateUserTelemetry,
  ) {
    const userTelemetry = await this.getUserTelemetry(userId);
    if (!userTelemetry) {
      await this.createUserTelemetry(userId, data);
    }
    return this.redis
      .getClient()
      .hset(this.userRouteTelemetryKey(userId), routeId, JSON.stringify(data));
  }
  public async createUserTelemetry(userId: string, data: IUpdateUserTelemetry) {
    return this.redis.getClient().hset(this.userTelemetry(), userId, JSON.stringify(data));
  }

  public async updateUserTelemetry(userId: string, data: IUserTelemetry) {
    return this.redis.getClient().hset(this.userTelemetry(), userId, JSON.stringify(data));
  }

  public async getUserRouteTelemetry<T = IUpdateUserTelemetry>(userId: string, routeId: string) {
    const redisData = await this.redis.getClient().hget(this.userRouteTelemetryKey(userId), routeId);
    if(!redisData){
      throw new Error(`Not found userRouteTelemetry with userId: ${userId} and routeId: ${routeId}`)
    }
    return JSON.parse(redisData) as T;
  }

  public async getUserTelemetry(userId: string) {
    return this.redis.getClient().hget(this.userTelemetry(), userId);
  }

  public async getAllUserTelemetry() {
    const redisData = await this.redis.getClient().hgetall(this.userTelemetry());
    const stringValues = Object.values(redisData);
    const mapData = stringValues.map((item) => JSON.parse(item))
    return await Promise.all(mapData.map((item) => this.getUserRouteTelemetry(item.userId, item.routeId)));
  }
}
