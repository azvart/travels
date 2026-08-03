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

  public async getUserRouteTelemetry(userId: string, routeId: string) {
    return this.redis.getClient().hget(this.userRouteTelemetryKey(userId), routeId);
  }

  public async getUserTelemetry(userId: string) {
    return this.redis.getClient().hget(this.userTelemetry(), userId);
  }

  public async getAllUserTelemetry() {
    return this.redis.getClient().hgetall(this.userTelemetry());
  }
}
